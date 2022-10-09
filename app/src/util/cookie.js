class Cookie {
    static set(cname, cvalue, exdays) {
        if (exdays !== 0) {
            const d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));

            const expires = `expires=${d.toUTCString()}`;

            document.cookie = `${cname}=${cvalue};${expires};path=/`;
        } else {
            document.cookie = `${cname}=${cvalue};path=/`;
        }
    }

    static get(cname) {
        const name = `${cname}=`;
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');

        for (const element of ca) {
            let c = element;
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }

            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    }

}

export default Cookie;
