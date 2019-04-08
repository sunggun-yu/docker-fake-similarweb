// server.js
var jsonServer = require('json-server')
var server = jsonServer.create()
var router = jsonServer.router('db.json')
var middlewares = jsonServer.defaults()

// Moment for date utils
var moment = require('moment');

const url = require('url');

server.use(middlewares);

// Add this before server.use(router)
server.use(jsonServer.rewriter({
  '/Site/:domain/v1/visits': '/values',
  '/Site/:domain/v1/pageviews': '/values',
  '/Site/:domain/v1/visitduration': '/values',
  '/Site/:domain/v1/bouncerate': '/values',
  '/Site/:domain/v1/orgkwcompetitor': '/orgkwcompetitor',
  '/Site/:domain/v1/orgsearch': '/orgsearch',
  '/Site/:domain/v1/paidkwcompetitor': '/paidkwcompetitor',
  '/Site/:domain/v1/referrals': '/referrals',
  '/Site/:domain/v1/paidsearch': '/paidsearch',
  '/Site/:domain/v1/SocialReferringSites': '/SocialReferringSites/1',
  '/Site/:domain/v1/leadingdestinationsites': '/leadingdestinationsites/1',
  '/Site/:domain/v1/traffic': '/traffic/1',
  '/Site/:domain/v2/tags': '/tags/1',
  '/Site/:domain/v2/similarsites': '/similarsites/1',
  '/Site/:domain/v2/categoryrank': '/categoryrank/1',
  '/Site/:domain/v2/category': '/category/1',
  '/Site/:domain/v2/alsovisited': '/alsovisited/1',
  '/v1/website/:domain/total-traffic-and-engagement/visits': '/total-traffic-and-engagement_visits?domain=:domain',
  '/v1/website/:domain/total-traffic-and-engagement/pages-per-visit': '/total-traffic-and-engagement_pages-per-visit?domain=:domain',
  '/v1/website/:domain/total-traffic-and-engagement/average-visit-duration': '/total-traffic-and-engagement_average-visit-duration?domain=:domain',
  '/v1/website/:domain/total-traffic-and-engagement/bounce-rate': '/total-traffic-and-engagement_bounce-rate?domain=:domain',
  '/v1/website/:domain/total-traffic-and-engagement/visits-split': '/total-traffic-and-engagement_visits-split/default?domain=:domain',
  '/v1/website/:domain/traffic-and-engagement/visits': '/traffic-and-engagement_visits?domain=:domain',
  '/v1/website/:domain/traffic-and-engagement/pages-per-visit': '/traffic-and-engagement_pages-per-visit?domain=:domain',
  '/v1/website/:domain/traffic-and-engagement/average-visit-duration': '/traffic-and-engagement_average-visit-duration?domain=:domain',
  '/v1/website/:domain/traffic-and-engagement/bounce-rate': '/traffic-and-engagement_bounce-rate?domain=:domain',
  '/v1/website/:domain/unique-visitors/desktop_mau': '/unique-visitors_desktop_mau?domain=:domain',
  '/v1/website/:domain/geo/traffic-by-country': '/geo_traffic-by-country/default?domain=:domain',
  '/v1/website/:domain/traffic-sources/outgoing-referrals': '/traffic-sources_outgoing-referrals/default?domain=:domain',
  '/v1/website/:domain/traffic-sources/overview': '/traffic-sources_overview/default?domain=:domain',
  '/v1/website/:domain/traffic-sources/overview-share': '/traffic-sources_overview-share/default?domain=:domain',
  '/v1/website/:domain/traffic-sources/referrals': '/traffic-sources_referrals/default?domain=:domain',
  '/v1/website/:domain/traffic-sources/social': '/traffic-sources_social/default?domain=:domain',
  '/v1/website/:domain/traffic-sources/ad-networks': '/traffic-sources_ad-networks/default?domain=:domain',
  '/v1/website/:domain/traffic-sources/paid-search': '/traffic-sources_paid-search/default?domain=:domain',
  '/v1/website/:domain/traffic-sources/organic-search': '/traffic-sources_organic-search/default?domain=:domain',
  '/v1/website/:domain/search-competitors/paidsearchcompetitors': '/search-competitors_paidsearchcompetitors/default?domain=:domain',
  '/v1/website/:domain/search-competitors/organicsearchcompetitors': '/search-competitors_organicsearchcompetitors/default?domain=:domain',
  '/v1/website/:domain/audience-interests/also-visited': '/audience-interests_also-visited/default?domain=:domain',
  '/v1/website/:domain/similar-sites/similarsites': '/similar-sites_similarsites/default?domain=:domain',
  '/v1/TopSites/categories': '/topsites_categories',
  '/v1/TopSites/countries': '/topsites_countries',
  '/v1/TopSites': '/topsites',
  '/v1/website/:domain/global-rank/global-rank': '/global-rank_global-rank?domain=:domain',
  '/v1/website/:domain/country-rank/country-rank': '/country-rank_country-rank?domain=:domain',
  '/v1/website/:domain/category-rank/category-rank': '/category-rank_category-rank?domain=:domain',
  '/v1/keywords/:keyword/analysis/paid-competitors': '/analysis_paid-competitors/default?keyword=:keyword',
  '/v1/keywords/:keyword/analysis/organic-competitors': '/analysis_organic-competitors/default?keyword=:keyword',
  '/v1/website/:domain/topsites/topsitesinternal': '/topsites_topsitesinternal/default',
  '/v2/website/:domain/mobile-web/visits': '/mobile-web_visits?domain=:domain',
  '/v2/website/:domain/mobile-web/average-visit-duration': '/mobile-web_average-visit-duration?domain=:domain',
  '/v2/website/:domain/mobile-web/pages-per-visit' : '/mobile-web_pages-per-visit?domain=:domain',
  '/v2/website/:domain/mobile-web/bounce-rate' : '/mobile-web_bounce-rate?domain=:domain'
}));

server.use(router);

server.listen(9081, function () {
  console.log('JSON Server is running')
});

router.render = function (req, res) {
  if (Object.keys(res.locals.data).length === 0) {
    var message = {
      Message: "Data Not Found"
    };
    res.status(404).json(message).end();
  } else {

    var result = null;

    if (!res.locals.data || res.locals.data.length < 1) {
      res.json({ Message: "Data Not Found" });
    } else if (res.locals.data.response) {
      result = res.locals.data.response;
    } else if (res.locals.data[0].response) {
      result = res.locals.data[0].response;
    } else {
      result = res.locals.data;
    }

    if (result && result.Date) {
      var previousMonth = moment().subtract(1, 'months').endOf('month').format("MM/YYYY");
      result.Date = previousMonth;
    }

    if (result && result.StartDate && result.EndDate) {
      var startDate = moment().subtract(3, 'months').endOf('month').format("MM/YYYY");
      var endDate = moment().subtract(1, 'months').endOf('month').format("MM/YYYY");
      result.StartDate = startDate;
      result.EndDate = endDate;
    }

    // Trick to add domain in the response body.
    var requestUrl = url.parse(req.url, true);

    switch (req.path) {
      case '/total-traffic-and-engagement_visits':
      case '/total-traffic-and-engagement_pages-per-visit':
      case '/total-traffic-and-engagement_average-visit-duration':
      case '/total-traffic-and-engagement_bounce-rate':
      case '/traffic-and-engagement_visits':
      case '/traffic-and-engagement_pages-per-visit':
      case '/traffic-and-engagement_average-visit-duration':
      case '/traffic-and-engagement_bounce-rate':
      case '/unique-visitors_desktop_mau':
      case '/global-rank_global-rank':
      case '/country-rank_country-rank':
      case '/category-rank_category-rank':
      case '/mobile-web_visits':
      case '/mobile-web_average-visit-duration':
      case '/mobile-web_pages-per-visit':
      case '/mobile-web_bounce-rate':
        result.meta.request.domain = requestUrl.query.domain;
        break;
      case '/total-traffic-and-engagement_visits-split/default':
      case '/traffic-sources_outgoing-referrals/default':
      case '/traffic-sources_overview/default':
      case '/traffic-sources_referrals/default':
      case '/traffic-sources_social/default':
      case '/traffic-sources_ad-networks/default':
      case '/traffic-sources_paid-search/default':
      case '/traffic-sources_organic-search/default':
      case '/search-competitors_paidsearchcompetitors/default':
      case '/search-competitors_organicsearchcompetitors/default':
      case '/audience-interests_also-visited/default':
      case '/similar-sites_similarsites/default':
      case '/geo_traffic-by-country/default':
        var startDate = moment(req.query.start_date).startOf("month").format("YYYY-MM-DD");
        var endDate = moment(req.query.end_date).endOf("month").format("YYYY-MM-DD");
        result.meta.request.domain =  requestUrl.query.domain;
        result.meta.request.start_date = startDate;
        result.meta.request.end_date = endDate;
        break;
      case '/traffic-sources_overview-share/default':
        var startDate = moment(req.query.start_date).startOf("month").format("YYYY-MM-DD");
        var endDate = moment(req.query.end_date).endOf("month").format("YYYY-MM-DD");
        result.meta.request.domain =  requestUrl.query.domain;
        result.meta.request.start_date = startDate;
        result.meta.request.end_date = endDate;

        var new_result = {
          meta: result.meta,
          visits: {
          }
        };

        new_result.visits[requestUrl.query.domain] = result.visits["modify_domain_name"];

        result = new_result;
        break;
      case '/analysis_paid-competitors/default':
      case '/analysis_organic-competitors/default':
        var startDate = moment(req.query.start_date).startOf("month").format("YYYY-MM-DD");
        var endDate = moment(req.query.end_date).endOf("month").format("YYYY-MM-DD");
        result.meta.request.keyword =  requestUrl.query.keyword;
        result.meta.request.start_date = startDate;
        result.meta.request.end_date = endDate;
        break;
      case 'topsites_topsitesinternal/default':
        var startDate = moment(req.query.start_date).startOf("month").format("YYYY-MM-DD");
        var endDate = moment(req.query.end_date).endOf("month").format("YYYY-MM-DD");
        result.meta.request.start_date = startDate;
        result.meta.request.end_date = endDate;
        break;
    }

    res.json(result);
  }
};
