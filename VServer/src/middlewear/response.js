const responseRestructure = (req, res, next) => { 
    
    const originalResponse = res.send.bind(res);
    const originalJson = res.json.bind(res);
    
    // res.send = (data) => {
    //   const structuredResponse = {
    //     success: res.statusCode >= 400 ? false : true,
    //     data: res.statusCode >= 400 ? null : data,
    //     error: res.statusCode >= 400 ? data : null,
    //   };

    //   return originalResponse(JSON.stringify(structuredResponse));
    // };


    res.json = (data) => { 
      
        const structuredResponse = {
          success: res.statusCode >= 400 ? false : true,
          data: res.statusCode >= 400 ? null : data,
          error: res.statusCode >= 400 ? data : null,
        };
         console.log("Inside response retructure", structuredResponse);
    return originalJson(structuredResponse);
    }
    
    next();
}


module.exports = responseRestructure;