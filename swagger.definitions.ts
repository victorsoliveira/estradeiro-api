/**
 * @swagger
 * definitions:
 *   Tool:
 *     properties:
 *       id:
 *         type: number
 *       title:
 *         type: string
 *       link:
 *         type: string
 *       description:
 *         type: string
 *       tags:
 *         type: array
 *         items:
 *          type: string
 *   Tools:
 *      type: array
 *      items:
 *        $ref: '#/definitions/Tool'
 *
 * /tools:
 *   get:
 *     tags:
 *       - Tools
 *     description: Returns all tools or
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: tag
 *         description: Tag
 *         in: query
 *         required: false
 *         schema:
 *           $ref: '#/definitions/Tool'
 *     responses:
 *       200:
 *         description: A collection of
 *         schema:
 *           $ref: '#/definitions/Tools'
 *   post:
 *     tags:
 *       - Tools
 *     description: Create a new tool
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: tool
 *         description: Tool object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Tool'
 *     responses:
 *       201:
 *         description: Created
 *         schema:
 *           $ref: '#/definitions/Tool'
 *   delete:
 *     tags:
 *       - Tools
 *     description: Delete a exist
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Tool ident
 *         in: params
 *         required: true
 *     responses:
 *       204:
 *         description: No Content*
 */