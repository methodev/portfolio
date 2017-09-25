/* =========================| Portfolio |========================= */



jQuery(document).ready(function($) {

  FastClick.attach(document.body);

  // Portfolio
  (function() {
    var portfolio = {
      init: function() {
        var portfolio = this;

        portfolio.loadGalleryOverview();

        return portfolio;
      },

      loadGalleryOverview: function() {
        var portfolio = this;

        $.ajax({
          method: 'GET',
          url: 'gallery-overview.html',
          dataType: 'html'
        }).done(function(response) {
          $('#document').append($(response));

          // Extend portfolio
          (function extend_portfolio() {
            $.extend(portfolio, {
              overview: $('#gallery-overview')
            });

            $.extend(portfolio.overview, {
              projects: portfolio.overview.find('.projects')
            });
          })();

          // Bind modal events
          (function bind_modal_events() {
            portfolio.overview.on('shown.bs.modal', function() {
              portfolio.overview.projects.masonry({
                itemSelector: '.project'
              });
            });
          })();

          portfolio.loadGallerySlider();
        });

        return portfolio;
      },

      loadGallerySlider: function() {
        var portfolio = this;

        $.ajax({
          method: 'GET',
          url: 'gallery-slider.html',
          dataType: 'html'
        }).done(function(response) {
          $('#document').append($(response));

          // Extend portfolio
          (function extend_portfolio() {
            $.extend(portfolio, {
              projects: {},
              images: [],
              gallery: $('#gallery-slider')
            });

            $.extend(portfolio.gallery, {
              title: portfolio.gallery.find('.modal-title'),
              body: portfolio.gallery.find('.modal-body'),
              slider: portfolio.gallery.find('.jumboslider'),
              items: portfolio.gallery.find('.jumboslider-item')
            });

            portfolio.gallery.items.each(function(index) {
              var project = $(this);

              for (var image = 1; image <= project.data('shots'); image++) {
                portfolio.images.push({
                  project: project.attr('id'),
                  image: image
                });
              }

              portfolio.projects[project.attr('id')] = {
                node: project,
                name: project.attr('id'),
                title: project.data('title'),
                shots: project.data('shots'),
                index: index
              };
            });
          })();

          // Initialize loading of all screenshots
          (function initial_images_loading() {
            portfolio.loadImage();
          })();

          // Bind modal events
          (function bind_modal_events() {
            portfolio.gallery.on('shown.bs.modal', function(e) {
              var trigger = $(e.relatedTarget).is('.screenshots') ?
                  $(e.relatedTarget) : $('.screenshots').first(),
                  project = portfolio.projects[trigger.attr('rel')],
                  reveal = function() {
                    portfolio.gallery.scrollTop(0);

                    if (!portfolio.gallery.slider.is('.showtime')) {
                      portfolio.gallery.slider.addClass('showtime');
                    }
                  };

              project.node.scrollTop(0);

              portfolio.gallery.title.text(project.title);

              if (project.index === 0) {
                portfolio.gallery.slider.addClass('showtime');
              }

              setTimeout(function() {
                portfolio.gallery.slider.jumboslider({
                  startPosition: project.index + 1,
                  onSlide: function() { setTimeout(reveal, 0); }
                });

                setTimeout(reveal, 0);
              }, 0);

              if (!project.loading && !project.loaded) {
                portfolio.prioritize(project);
              }
            });


            portfolio.gallery.on('hidden.bs.modal', function() {
              portfolio.gallery.slider.removeClass('showtime');
              portfolio.gallery.slider.jumboslider().unbind('onSlide');
              portfolio.gallery.slider.jumboslider().destroy();
            });
          })();

          // Bind slider events
          (function bind_slider_events() {
            $(document).on('onSlide', '.jumboslider', function(e, target) {
              var pos = target.currentPosition,
                  id = $(e.target)
                    .find('.jumboslider-item:nth-child('+pos+')').attr('id'),
                  project = portfolio.projects[id];

              portfolio.gallery.title.text(project.title);
              project.node.scrollTop(0);

              if (!project.loading && !project.loaded) {
                portfolio.prioritize(project);
              }
            });
          })();
        });

        return portfolio;
      },

      loadImage: function() {
        var portfolio = this,
            image = portfolio.images[0].image,
            name = portfolio.images[0].project,
            platform = $('html').is('.mobile') ? 'mobile' : 'desktop',
            src = 'assets/images/projects/' +
              platform + '/' + name + '/shot' + image + '.jpg',
            project = portfolio.projects[name];

        project.loading = true;

        $('<img alt="'+project.title+'" src="'+src+'" width="1200">').on('load', function() {
            var shot = $('<div class="shot">').append($(this));

            project.node.append(shot);

            if (image === project.shots) {
              project.loading = false;
              project.loaded = true;

              project.node.addClass('done');
            }

            for (var item = 0; item < portfolio.images.length; item++) {
              var current = portfolio.images[item];

              if (
                current.project === project.name &&
                current.image === image
              ) {
                portfolio.images.splice(portfolio.images.indexOf(current), 1);
              }
            }

            if (portfolio.images.length > 0) { portfolio.loadImage(); }
            else { delete portfolio.images; }
          });

        return portfolio;
      },

      prioritize: function(project) {
        var portfolio = this,
            specials = [];

        for (var shot = 0; shot < project.shots; shot++) {
          for (var image = 0; image < portfolio.images.length; image++) {
            var current = portfolio.images[image];

            if (current.project === project.name) {
              var place = portfolio.images.indexOf(current);

              specials.push(current);

              portfolio.images.splice(place, 1);

              break;
            }
          }
        }

        specials.reverse();

        for (var special in specials) {
          portfolio.images.unshift(specials[special]);
        }

        return portfolio;
      }
    };

    portfolio.init();
  }());

});