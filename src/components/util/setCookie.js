function setCookie(cname, cvalue, exdays) {

    if(exdays !== 0){
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
    
        var expires = "expires="+ d.toUTCString();
    
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }else{
        document.cookie = cname + "=" + cvalue + ";path=/";
    }
    
}

export default setCookie;