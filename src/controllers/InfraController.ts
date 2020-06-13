import { JsonController, Post, HttpCode, Controller } from 'routing-controllers';
import { InjectRepository } from "typeorm-typedi-extensions";
import csvParser from 'csv-parser'
import * as fs from 'fs';
import * as path from 'path'

import { StopPointRepository } from '../repositories/StopPointRepository';
import { PlaceRepository } from '../repositories/PlaceRepository';

import { StopPoint } from '../entities/StopPoint';
import { Place } from '../entities/Place';

import * as _ from 'lodash';

@Controller('/infra')
export class InfraController {

  constructor(
    @InjectRepository() private readonly stopPointRepo: StopPointRepository,
    @InjectRepository() private readonly placeRepo: PlaceRepository) { }

  @HttpCode(200)
  @Post('/stoppoints')
  public async stopPoints(): Promise<void> {

    const NOT_FOUND_LAT_OR_LONG = -9999999999;

    console.log('Cleaning stop points table...');

    await this.stopPointRepo.createQueryBuilder()
    .delete()
    .from(StopPoint)
    .execute();

    const stopPoints: StopPoint[] = [];

    console.log ('Loading stop points file...');

    fs.createReadStream(path.resolve(__dirname, '..', '..', 'files', 'stop_points.csv'))
      .pipe(csvParser({
            separator: ';',
            mapHeaders: ({ header, index }) => header.toLowerCase(),
            mapValues: ({ header, index, value }) => {

              const latLongPattern = /^(-?)\d+/gm;
              const lowerCaseValue = value.toLowerCase();

              if (header === 'lat' || header === 'long') {
                  return lowerCaseValue.match(latLongPattern) ? parseInt(value) : NOT_FOUND_LAT_OR_LONG;
              }

              if (header === 'fuel_supply' || header === 'restaurant' || header === 'snack_bar' || 
                  header === 'convenience_store' || header === 'public_phone' || header === 'hotel' ||
                  header === 'mechanics' || header === 'borrower' || header === 'money_supply') {

                return lowerCaseValue === '1' ? true : false;
              }

              if (header === 'site_size_m2' || header === 'vacancy_length'){
                const parsed = parseInt(value);
                if (parsed){
                  return (parsed === NaN) ? null : parsed;
                }
                return null;
              }

              return value;
            }

          }))
      .on('data', (data: StopPoint) => {

        console.log(data);

        if (data.lat !== NOT_FOUND_LAT_OR_LONG 
          && data.long !== NOT_FOUND_LAT_OR_LONG) {
          stopPoints.push(data);
        }

      })
      .on('end', async () => {
        
        console.log('Stop points file loaded!');

        console.log ('Populating stop points table...');

        _.chunk(stopPoints, 1000).forEach( async (storePointsPart: StopPoint[]) => {
          await this.stopPointRepo.insert(storePointsPart);
        });

        console.log ('Stop points table populated!');
      });

      return await Promise.resolve();
  }

  
  @HttpCode(200)
  @Post('/places')
  public async places(): Promise<void> {

    console.log('Cleaning places table...')

    await this.placeRepo.createQueryBuilder()
    .delete()
    .from(Place)
    .execute();

    console.log ('Loading places file...');
    
    const buffer = fs.readFileSync(path.resolve(__dirname, '..', '..', 'files', 'places.json'));
    const placesData = <Array<any>>JSON.parse(buffer.toString('utf8'));

    const places = placesData.map((p) => {
      let place = new Place();
      place.lat = p.latitude;
      place.long = p.longitude;
      place.category = p.categoria;
      place.name = p.nome_fantasia;
      place.always_open = p.sempre_aberto;
      place.period_info = p.periodo;
      place.open_time = String(p.horario_abertura).substring(0,50);
      place.close_time = String(p.horario_fechamento).substring(0,50);
      place.phone = String(p.telefone).substring(0,50); ;
      place.details = p.observacoes;
      return place;
    })

    console.log('Places file loaded!');

    console.log ('Populating places table...');

    _.chunk(places, 1000).forEach( async (placesPart: Place[]) => {
      await this.placeRepo.insert(placesPart);
    });

    console.log ('Places table populated!');

    return await Promise.resolve();
  }

}
