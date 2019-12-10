import { setHeaderInfo, getTemplate } from "../helpers/storage.js";
import { get } from "../helpers/requester.js";


export function getHome(ctx) {
    setHeaderInfo(ctx);
    if(ctx.isAuth) {
        get('appdata', 'treks', 'Kinvey')
            .then((treks) => {
                ctx.treks = treks;
                getTemplate(ctx, './views/home.hbs');
            });
    } else {
        getTemplate(ctx, './views/home.hbs');
    }
}