// config/handlebarsConfig.js
import engine from 'express-handlebars';
//Configuracion para handlebars.
//Esta configuracion permite usar archivo .hbs
export const handlebarsConf = (app) => {
	app.engine('hbs', engine({ extname: 'hbs' }));
	app.set('views', 'src/views');
	app.set('view engine', 'hbs');
};
