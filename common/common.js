const trimData = (string)=>{
    return string && string.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'').trim();
}


module.exports = {
    trimData
}