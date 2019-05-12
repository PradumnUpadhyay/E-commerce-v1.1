exports.error = (req, res, next) => //404.html
{ 
   res.status(404).render('404',
               {title: 'Page Not Found', 
                error: true,
               path: ''
            });
};