export {};
const connQuery = require('../db/conn');


interface enterpriseDataObjProps {
    fullName: string,
    email: string,
    phone: string,
    whatsapp: string,
    password: string,
    enterpriseName: string,
    country: string,
    state: string,
    city: string,
    address: string,
    addressNumber: string,
    instagram: string,
    facebook: string,
    website: string,
    enterpriseCategory: string,
    enterpriseSpecificCategory: string
}

module.exports = class EnterpriseModel {
   

    // Insert Enterprise
    async insertEnterprise( dataObject:enterpriseDataObjProps ) {
        const { email } = dataObject;

        console.log('insertEnterprise');
        let objLength = Object.keys(dataObject).length;

        const query_insert = `INSERT INTO Enterprise 
            (${'??,'.repeat(objLength-1)}??) 
            VALUES (${'?,'.repeat(objLength-1) }?)`;
        
        const data = Object.keys(dataObject).concat( Object.values(dataObject) );

        // INSERT enterprise in table
        await connQuery( query_insert, data ).catch((err:any) => {throw err});
    
        // GET the enterprise and return it
        const result = this.getEnterpriseByEmail( email );
        return result;
    }

    // Insert Ad
    async insertAd( tableName: string, dataObject: Object ) {
        console.log('insertAd');

        let objLength = Object.keys(dataObject).length;

        const query_insert = `INSERT INTO ${tableName+'Ads'} 
            (${'??,'.repeat(objLength-1)}??) 
            VALUES (${'?,'.repeat(objLength-1) }?)`;
        
        const data = Object.keys(dataObject).concat( Object.values(dataObject) );

        await connQuery( query_insert, data ).catch((err:any) => {throw err});

        return ;
    }

    async getAllAds( id: number ) {
        var ads: any[] = [];

        var query_select_infantil= `SELECT * FROM InfantilAds WHERE id = ${id}`;
        var query_select_debutante = `SELECT * FROM DebutanteAds WHERE id = ${id}`;
        var query_select_aniversario = `SELECT * FROM AniversarioAds WHERE id = ${id}`;
    
        
        var result_infantil = await connQuery( query_select_infantil ).catch( (err:any) => {throw err});
        if(result_infantil.length > 0) {
            ads.push( result_infantil[0] );
        }

        var result_debutante = await connQuery( query_select_debutante ).catch( (err:any) => {throw err});
        if(result_debutante.length > 0) {
            ads.push( result_debutante[0] );
        }

        var result_aniversario = await connQuery( query_select_aniversario ).catch( (err:any) => {throw err});
        if(result_aniversario.length > 0) {
            ads.push( result_aniversario[0] );
        }
        console.log('ads no model');
        console.log( ads );

        return ads;
    }

    async getAd( id: number, partyType: string ) {
        console.log('entrou getAd');
        
        var query_select= `SELECT * FROM ${partyType+'Ads'} WHERE id = ${id}`;
    
        var result = await connQuery( query_select ).catch( (err:any) => {throw err});
        console.log('saiu getAd');
        
        return result[0];
    }

    async getEnterpriseByEmail( email: string ) {
        const query_select = `SELECT * FROM Enterprise WHERE email = '${email}'`;
            
        const result = await connQuery( query_select ).catch( (err:any) => {throw err});
        
        return result[0];
    }

    async getEnterpriseById( id: number ) {
        const query_select = `SELECT * FROM Enterprise WHERE id = ${id}`;
            
        const result = await connQuery( query_select ).catch( (err:any) => {throw err});
        
        return result[0];
    }

    async updateAd( id:number, partyType: string, data: any ){
        let objKeys = Object.keys(data);

        const query_update = `
            UPDATE ${partyType+'Ads'} 
            SET serviceDescription = '${data.serviceDescription}',
                answer1 = '${data.answer1}',
                answer2 = '${data.answer2}'
            WHERE id = ${id}
        `;

        await connQuery( query_update ).catch((err:any) => {throw err});
    
    }

    async updateEnterprise( id: number, data: any ){
        const query_update = `
            UPDATE Enterprise
            SET fullName = '${data.fullName}',
                email = '${data.email}',
                phone = '${data.phone}',
                whatsapp = '${data.whatsapp}',
                password = '${data.password}',
                enterpriseName = '${data.enterpriseName}',
                country = '${data.country}',
                state = '${data.state}',
                city = '${data.city}',
                address = '${data.address}',
                addressNumber = '${data.addressNumber}',
                instagram = '${data.instagram}',
                facebook = '${data.facebook}',
                website = '${data.website}'
            WHERE id = ${id}
        `;

        await connQuery( query_update ).catch((err:any) => {throw err});
    }

}
