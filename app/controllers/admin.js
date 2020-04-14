module.exports.formulario_inclusao_noticia = function (application, req, res) {
    res.render("admin/form_add_noticia", {validacao: false, noticia: {}});
};

module.exports.noticia_salvar = function (application, req, res) {
    var noticia = req.body;

    req.assert('titulo', 'Titulo é obrigatório').notEmpty();
    req.assert('resumo', 'O Resumo é obrigatório').notEmpty();
    req.assert('resumo', 'O Resumo deve conter entre 10 e 100 caracteres').len(10, 100);
    req.assert('autor', 'O nome do autor é obrigatório').notEmpty();
    req.assert('data_noticia', 'A data é obrigatório').notEmpty().isDate({format: 'YYYY-MM-DD'});
    req.assert('noticia', 'A notícia é obrigatório').notEmpty();

    var erros = req.validationErrors();

    if (erros) {
        res.render("admin/form_add_noticia", {validacao: erros, noticia: noticia});
        return;
    }

    var connection = application.config.dbConnections();
    var noticiasModel = new application.app.models.NoticiasDAO(connection);

    noticiasModel.salvarNoticia(noticia, function (error, result) {
        res.redirect('/noticias');
    });
};