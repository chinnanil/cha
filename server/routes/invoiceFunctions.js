


function calHrs(resource,rate,zldata,projectName,userdata){
    var Hours=0.0;
    var user = resource
   for(let u=0;u<userdata.length;u++){
    if(userdata[u].uid === resource){
        user =user+"-"+userdata[u].fname
    }
}
    

    for(let i=0;i<zldata.length;i++){
        if(zldata[i].UserId === resource && zldata[i].Location === projectName){
            Hours=Hours+parseFloat(zldata[i].Hrs)
        }
       
    }
    var Total=parseFloat(rate)*Hours;
    //the below data returns ResourceNa, Rate, Hours and totalAmount
    var data={Resource:user,Rate:rate,Hrs:Hours,Total:Total}


    return data

}



function resourceHours(resources,projectName,zldata,userdata){
    var resourceData=[]
    var rData=JSON.parse(resources)
    var ProjectTotalAmount = 0.0;

    for(let i=0;i<rData.length;i++){
        let resource = rData[i].id
        let rate = rData[i].Rate
       
        //from callHrs function we get the Resource data with ResourceName, Rate, Hours and TotalAmount
        var result = calHrs(resource,rate,zldata,projectName,userdata);
        ProjectTotalAmount=ProjectTotalAmount+parseFloat(result.Total)
        
        //console.log("Result of Resource: ",result.Hrs)

        //below if used for push the resource data only when resource hours are greaterthan zero
        if(parseFloat(result.Hrs)>0){
            resourceData.push(result)
        }
        
        
    }
   
    
      return {resourceData,ProjectTotalAmount}

}

module.exports = {resourceHours}