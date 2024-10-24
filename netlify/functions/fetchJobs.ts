import { Handler } from '@netlify/functions';

   const handler: Handler = async (event) => {
     const pageNumber = event.queryStringParameters?.page || 1;
    const itDuunitApi = `https://duunitori.fi/api/v1/fdfadafa0ccb207844460fe7a7b9c73ecc9d1a04/jobentries?area=&format=json&page=${pageNumber}&page_size=100&search=&t=1729175939&tag0=tieto-+ja+tietoliikennetekniikka`;
     const response = await fetch(itDuunitApi);
     const data = await response.json();

     return {
       statusCode: 200,
       body: JSON.stringify({
         fetchedJobs: data.results,
         next: data.next,
         count: data.count,
       }),
     };
   };

export { handler };
