// touchetong core module

(function () {

    window.esapp = {
        currentPage: {
            id: '',
            name: '',
            count: 1
        },
        pages: {
            'home': {
                parent: [],
                isSingle: true
            },
            'inputs': {
                parent: [{
                    title: 'UI 控件'
                }],
                css: 'inputs/inputs.css',
                html: 'inputs/inputs.html',
                title: '输入框',
                isSingle: true
            },
            'single-tab': {
                parent: [{
                    title: '页面导航'
                }],
                html: 'single-tab/single-tab.html',
                title: '单实例页面',
                isSingle: true
            },
            'multiple-tab': {
                parent: [{
                    title: '页面导航'
                }],
                html: 'multiple-tab/multiple-tab.html',
                title: '多实例页面',
                isSingle: false
            },
            'logout': {
                parent: [{
                    title: '多页路由'
                }],
                html: 'logout/page.html',
                title: '退出',
                js: 'script',
                isSingle: true
            },
            'widget': {
                parent: [],
                html: 'widget/widget.html',
                title: 'Widget 规范',
                js: 'script',
                isSingle: true
            },
            'widget-table': {
                parent: [],
                html: 'widget-table/widget-table.html',
                title: 'Widget table',
                js: 'script',
                isSingle: true
            }
        }
    }
    window.esapp.route = {
        change: function (hash, config, args) {
            var id = _.last(_.words(hash, /[^/]+/g));
            var page = window.esapp.pages[id];

            if (!page) {
                var list = id.split('-')
                var oriId = []
                for (var i = 0; i < list.length - 1; i++) {
                    oriId.push(list[i])
                }
                page = window.esapp.pages[oriId.join('-')]
            }
            if (!page) {
                return
            }
            if (!config) {
                config = {
                    single: true
                }
            }
            var js = page.js
            var html = page.html
            var css = page.css
            var title = page.title

            // var currentH = $('#' + id)
            if ($('#' + id).length > 0) {
                $('#shell-tabs a[href="#' + id + '"]').tab('show');
                return;
            }
            if (!config.single) {
                // var id = id + '-' + (Math.random() * 10000).toFixed(0)

                // tab contant
                $('#shell-contents').append(Handlebars.compile($('#shell-content').html())({
                    id: id,
                    value: hash
                }))

                // tab
                $('#shell-tabs').append(Handlebars.compile($('#shell-tab').html())({
                    id: id,
                    title: title,
                    value: hash
                }))

                // breadcrumb
                var parent = _.clone(page.parent)
                if (!parent) {
                    parent = []
                }
                parent.push({
                    title: page.title
                })
                $('#' + id).prepend(Handlebars.compile($('#shell-breadcrumb').html())(parent))

                // add iframe
                var iframe = $('<iframe class="tab-iframe" src="' + 'app/' + esapp.base.lang + '/' + html + '"></iframe>')
                $('#' + id + ' .tab-content').eq(0).append(iframe)
                $('#' + id + ' .tab-iframe').load(function () {
                    var iframeHeight = $(this).contents().height()
                    $(this).height(iframeHeight + 'px')
                })

                $('#shell-tabs a[href="#' + id + '"]').tab('show')
                // $.material.init()
            } else {
                // load css
                $('.shell-style').attr('media', 'print')
                var currentS = $('#' + id + '-style')
                if (currentS.length > 0) {
                    currentS.attr('media', 'screen')
                } else if (css) {
                    css = 'app/' + esapp.base.lang + '/' + css
                    $('head').append('<link rel="stylesheet" href="' + css + '" media="screen" title="no title" charset="utf-8" class="shell-style" id="' + id + '-style">')
                }

                // load html
                var currentH = $('#' + id)
                if (currentH.length > 0) {
                    $('#shell-tabs a[href="#' + id + '"]').tab('show')
                } else if (html) {
                    $('#shell-contents').append(Handlebars.compile($('#shell-content').html())({
                        id: id
                    }))
                    $('#' + id + ' .tab-content').eq(0).load('app/' + esapp.base.lang + '/' + html)

                    // breadcrumb
                    var parent = _.clone(page.parent)
                    if (!parent) {
                        parent = []
                    }
                    parent.push({
                        title: page.title
                    })
                    $('#' + id).prepend(Handlebars.compile($('#shell-breadcrumb').html())(parent))

                    $('#shell-tabs').append(Handlebars.compile($('#shell-tab').html())({
                        id: id,
                        title: title,
                        value: hash
                    }))

                    $('#shell-tabs a[href="#' + id + '"]').tab('show')
                    // $.material.init()

                    // load javascript only add page
                    requirejs([id],
                        function (page) {
                            page.init(args)
                        }
                    )
                }

            }
        },
        path: function (href) {
            var id = href + '-' + (Math.random() * 10000).toFixed(0)
            var isSingle = window.esapp.pages[href].isSingle;
            if (window.esapp.pages[href].isSingle) {
                this.watch(href);
            }
            // else {
            //     window.esapp.pages[href].count = window.esapp.pages[href].count ? 1 : window.esapp.pages[href].count + 1;
            // }
            window.esapp.pages[href].current = true;
            var hash = isSingle ? "/" + href : "/" + href + '/' + id;
            location.hash = hash;
        },
        watch: function (href) {
            this.change(href, {
                single: esapp.pages[href] ? esapp.pages[href].isSingle : false
            }, {
                id: href
            })
        },
        init: function () {
            this.forEachCB = function (n, key) {
                var path = n.isSingle ? key : key + "/:id";
                Path.map("#/" + path).to(function () {
                    var href = n.isSingle ? key : key + '/' + this.params['id'];
                    esapp.route.watch(href);
                });
            };
            _.forEach(esapp.pages, this.forEachCB);
        }
    }
    window.esapp.base = {
        lang: 'lang'
    };
    window.esapp.init = function () {
        require(['widget-core'], function () {
            window.esapp.route.init();
            $('#side-menu').metisMenu();
            // $.material.init({
            //     toggle: false
            // })

            // init shell tabs
            $('#shell-tabs').delegate('a', 'click', function (e) {
                e.preventDefault()
                location.hash = '/' + $(this).data('value');
                //esapp.route.change($(this).data('value'))
            })

            // shell tabs remove event
            $('#shell-tabs').delegate('.shell-tab-remove', 'click', function (e) {
                e.preventDefault()
                var id = $(this).data('value')
                $('#shell-tabs a[href="#' + id + '"]').remove()
                $('#' + id).remove()
                // esapp.route.change()
                location.hash = '/' + $('#shell-tabs a:last').data('value')
                return false
            })

            $('a').on("click", function (e) {
                var href = $(e.target).attr("esapp-href");
                if (href) {
                    esapp.route.path(href)
                }
            })

            // display home page
            Path.root('/home');
            Path.listen();
        })
    }
    requirejs.config({
        //urlArgs: "bust=" + (new Date()).getTime(),
        baseUrl: 'app/' + esapp.base.lang,
        paths: {
            'home': 'home/home',
            'inputs': 'inputs/inputs',
            'single-tab': 'single-tab/single-tab',
            'multiple-tab': 'multiple-tab/multiple-tab',
            'logout': 'logout/script',
            'widget': 'widget/widget',
            'widget-table': 'widget-table/widget-table',
            'widget-demo': 'widget-demo/widget-demo',
            'widget-core': '../../widget/core',
            'widget-define': '../../widget/widget-define-deferred',
            'widget-table-deferred': '../../widget/widget-table-deferred',
            'widget-jsgrid': '../../js/jsgrid'
        }
    })
    $(function () {
        window.esapp.init()
    })
})()
