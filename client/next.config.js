module.exports = {
    /** Ручная настройка для обнаружения измений
     * потому как есть заддержка при передачи с докер контейнера */
    webpackDevMiddleware: config => {
        config.watchOptions.poll = 300;
        return config;
    }
};
