import replace from "gulp-replace"; // Пошук і заміна
import plumber from "gulp-plumber"; // Опрацювання помилок
import notify from "gulp-notify"; // Повідомлення (підказки) 
import browsersync from "browser-sync"; // Локальний сервер
import newer from "gulp-newer"; // Перевірка оновлень
import ifPlugins from "gulp-if"; // Умовне розгалуження

export const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify,
    browsersync: browsersync,
    newer: newer,
    if: ifPlugins
}