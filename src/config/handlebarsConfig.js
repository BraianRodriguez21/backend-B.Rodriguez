// import engine from 'express-handlebars';

// export const handlebarsConf = (app) => {
// 	app.engine('hbs', engine({ extname: 'hbs' }));
// 	app.set('views', 'src/views');
// 	app.set('view engine', 'hbs');
// };
import exphbs from 'express-handlebars';

export const handlebarsConf = (app) => {

    const hbs = exphbs.create({
        extname: 'hbs', 
        defaultLayout: 'main',
    });

    app.engine('hbs', hbs.engine);
    app.set('view engine', 'hbs'); 
};
