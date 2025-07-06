'use strict';
const rightNow = new Date();

const month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const d = new Date();
let this_year = d.getFullYear();
let today = d.getDate();

function filterPress() {}

function filterDates(startDate, endDate) {
  var sdate = new Date(startDate);
  var edate = new Date(endDate);
  return sdate <= today && edate >= today;
}

function dateCompare(dateToCompare) {
  var givenDate = dateToCompare;
  var currentDate = new Date();

  givenDate = new Date(givenDate);
  if (givenDate >= currentDate) {
    return 1;
  } else {
    return 0;
  }
}

function dateCompareBefore(dateToCompare) {
  var givenDate = dateToCompare;
  var currentDate = new Date();

  givenDate = new Date(givenDate);
  if (givenDate <= currentDate) {
    return 1;
  } else {
    return 0;
  }
}

function dateBetween(start, end) {
  let now = new Date().getTime();
  if (now >= new Date(start).getTime() && now <= new Date(end).getTime()) {
    return 1;
  } else {
    return 0;
  }
}

function initNavigation(pageType) {
  let constInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    cache: 'default',
  };
  let constRequest = '';

  if (pageType == 'fullNav') {
    constRequest = new Request('/js/full-navigation.json', constInit);
  } else {
    constRequest = new Request('/js/navigation.json', constInit);
  }

  let stringImport = '';

  fetch(constRequest)
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      if ((pageType = 'fullNav')) {
        stringImport +=
          '<div class="container"><nav class="navbar navbar-expand-md navbar-dark" style="background-color: #C8102E;">';
        stringImport += '<div class="container-fluid">';
        stringImport +=
          '<a class="navbar-brand" href="https://maverik.com"><img src="/images/maverik-logo.png" id="logo" style="vertical-align:middle" title="Maverik Logo" alt="Maverik Logo"></a>';
        stringImport +=
          '<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">';
        stringImport += '<span class="navbar-toggler-icon"></span>';
        stringImport += '</button>';
        stringImport +=
          '<div class="collapse navbar-collapse" id="navbarNavAltMarkup">';
        stringImport += '<div class="navbar-nav">';

        for (let x = 0; x < data.length; x++) {
          stringImport +=
            '<a class="nav-link" href="' +
            data[x].url +
            '">' +
            data[x].link +
            '</a>';
        }

        stringImport += '</div></div></div></nav></div>';
      } else {
        for (let x = 0; x < data.length; x++) {
          stringImport +=
            '<a href="' + data[x].url + '">' + data[x].link + '</a>';
        }
      }
      document.getElementById('navigation').innerHTML = stringImport;
    });
}

function initFooter(siteFooter) {
  let constInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    cache: 'default',
  };

  let navRequest = new Request('/js/footer-nav.json', constInit);
  let stringImport = '';

  fetch(navRequest)
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      let newWindow = '';
      stringImport += '<div class="container"><div class="container-fluid">';
      stringImport += '<div class="row footerlinks">';
      stringImport += '<div class="col-md-3 col-sm-12">';
      for (let x = 0; x < data.length; x++) {
        if (data[x].column == 1) {
          if (data[x].newTarget == 1) {
            newWindow = 'target="_blank"';
          } else {
            newWindow = '';
          }
          stringImport +=
            '<a href="' +
            data[x].url +
            '" title="' +
            data[x].linkName +
            '"' +
            newWindow +
            '>' +
            data[x].linkName +
            '</a>';
        }
      }
      stringImport += '</div>';
      stringImport += '<div class="col-md-3 col-sm-12">';
      for (let x = 0; x < data.length; x++) {
        if (data[x].column == 2) {
          if (data[x].newTarget == 1) {
            newWindow = 'target="_blank"';
          } else {
            newWindow = '';
          }
          stringImport +=
            '<a href="' +
            data[x].url +
            '" title="' +
            data[x].linkName +
            '"' +
            newWindow +
            '>' +
            data[x].linkName +
            '</a>';
        }
      }
      stringImport += '</div>';

      stringImport += '<div class="col-md-3 col-sm-12">';
      for (let x = 0; x < data.length; x++) {
        if (data[x].column == 3) {
          if (data[x].newTarget == 1) {
            newWindow = 'target="_blank"';
          } else {
            newWindow = '';
          }
          stringImport +=
            '<a href="' +
            data[x].url +
            '" title="' +
            data[x].linkName +
            '"' +
            newWindow +
            '>' +
            data[x].linkName +
            '</a>';
        }
      }
      stringImport += '</div>';

      stringImport += '<div class="col-md-3 col-sm-12">';
      for (let x = 0; x < data.length; x++) {
        if (data[x].column == 4) {
          if (data[x].newTarget == 1) {
            newWindow = 'target="_blank"';
          } else {
            newWindow = '';
          }
          stringImport +=
            '<a href="' +
            data[x].url +
            '" title="' +
            data[x].linkName +
            '"' +
            newWindow +
            '>' +
            data[x].linkName +
            '</a>';
        }
      }
      stringImport += '</div>';

      stringImport += '</div>';
      stringImport +=
        '<div class="row mt-5"><div class="col-md-6 col-sm-12"><p>&copy; ' +
        this_year +
        " Maverik – Adventure's First Stop.</p></div>";
      stringImport += '<div class="col-md-6 col-sm-12"><div class="social">';
      for (let x = 0; x < data.length; x++) {
        if (data[x].column == 0) {
          stringImport +=
            '<a target="_blank" href="' +
            data[x].url +
            '" title="' +
            data[x].linkName +
            '"><i class="fab ' +
            data[x].icon +
            '"></i></a>';
        }
      }
      stringImport += '</div">';
      stringImport += '</div">';
      stringImport += '</div">';
      stringImport += '</div">';

      document.getElementById('footer').innerHTML = stringImport;
    });
}

function initDeals(dealType) {
  let constInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    cache: 'default',
  };

  let dealsRequest = '';
  let url = '';

  switch (dealType) {
    case 'construction':
      dealsRequest = new Request('/js/construction-deals.json', constInit);
      url = '/images/stores/deals/';
      break;
    default:
      dealsRequest = new Request(
        '/deals/' + dealType + '/deals.json',
        constInit
      );
      url = '/deals/' + dealType + '/images/';
      break;
  }

  let stringImport = '';
  let callOutText = '';
  let customStyle = '';

  fetch(dealsRequest)
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      for (let x = 0; x < data.length; x++) {
        if (typeof data[x].callOut != 'undefined') {
          if (data[x].callOut == 'new') {
            callOutText = '<p class="featureCallout">New Product!</p>';
            customStyle = 'style="background-color:#C8102E;color:#fff;"';
          } else {
            callOutText = '<p>&nbsp;</p>';
          }
        }
        if (data.length % 3 == 0) {
          stringImport +=
            '<div class="col-lg-4 col-md-6 col-xs-12 polaroid">' +
            callOutText +
            '<div class="my-2" ' +
            customStyle +
            '>';
        } else {
          stringImport +=
            '<div class="col-lg-3 col-md-6 col-xs-12 polaroid">' +
            callOutText +
            '<div class="my-2" ' +
            customStyle +
            '>';
        }

        stringImport +=
          '<div class="pt-2"><img src="' +
          url +
          data[x].image +
          '" alt="' +
          data[x].itemName +
          '" class="img-fluid mb-3" /></div>';
        stringImport += '<h4 class="text-center">' + data[x].line1 + '</h4>';
        stringImport += '<h6 class="text-center">' + data[x].line2 + '</h6>';
        stringImport += '<p class="text-center">' + data[x].itemName + '</p>';

        stringImport += '</div></div>';
        callOutText = '';
        customStyle = '';
      }

      document.getElementById('deals').innerHTML = stringImport;
    });
}

function initDOW() {
  let constInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    cache: 'default',
  };

  let dealsRequest = '';
  let url = '';
  dealsRequest = new Request('/deals/dow/deals.json', constInit);
  url = '/deals/dow/images/';
  let stringImport = '';
  stringImport +=
    '<div class="col-12"><h2 class="text-center">Maverik Deal of the Week</h2></div>';

  fetch(dealsRequest)
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      for (let x = 0; x < data.length; x++) {
        if (x == 0) {
          stringImport +=
            '<div class="col-12"><h5 class="text-center">Visit your local Maverik by ' +
            data[x].endDate +
            '</h5></div>';
        }
        if (dateBetween(data[x].startDate, data[x].endDate)) {
          stringImport += '<div class="col-md-3 col-xs-12">';
          stringImport +=
            '<img src="' +
            url +
            data[x].image +
            '" alt="' +
            data[x].itemName +
            '" class="img-fluid mb-3" /></div>';
          stringImport += '<div class="col-md-3 col-xs-12">';
          stringImport +=
            '<h3 class="text-center">' + data[x].itemName + '</h3>';
          stringImport += '<h5 class="text-center">' + data[x].line1 + '</h5>';
          stringImport += '<h6 class="text-center">' + data[x].line2 + '</h6>';
        } else {
          stringImport += '</div></div>';
        }
      }

      document.getElementById('dow').innerHTML = stringImport;
    });
}

function constructionList(locationType) {
  let constInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    cache: 'default',
  };

  let constRequest = new Request('/js/construction-list.json', constInit);
  let stringImport = '';
  let addImage = '';
  let openingTypeString = '';

  fetch(constRequest)
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      for (let x = 0; x < data.length; x++) {
        if (data[x].OpeningDate != 'TBA' && dateCompare(data[x].OpeningDate)) {
          console.log('Opening Date:', data[x].OpeningDate);
          if (data[x].StoreType == 'New') {
            addImage =
              '<img src="/images/stores/red-mountains.svg" class="img-fluid" style="max-width:64px;" alt="New"/><h6>New</h6>';
            openingTypeString = 'Opens';
          } else {
            addImage =
              '<img src="/images/stores/red-mountains-outline.svg" class="img-fluid" style="max-width:64px;" alt="Remodeled"/><h6>Remodeled</h6>';
            openingTypeString = 'Re-opens';
          }
          stringImport +=
            '<div class="col-lg-3 col-md-6 col-sm-12 text-center mb-4">';
          stringImport += addImage;
          stringImport +=
            '<h4 class="pt-2 mb-0">' + data[x].StoreLocation + '</h4>';
          stringImport +=
            '<p>' +
            openingTypeString +
            ' ' +
            niceDate(data[x].OpeningDate) +
            '</p>';
          stringImport +=
            '<p><a href="https://www.google.com/maps/search/?api=1&query=' +
            encodeURIComponent(data[x].Address + ' ' + data[x].Address2) +
            "\" target='_blank' title='Maverik Location'\">";
          stringImport += data[x].Address + '<br />';
          stringImport += data[x].Address2 + '</a></p>';
          stringImport += '</div>';
        }
      }
      if (stringImport != '') {
        document.getElementById('locations').innerHTML = stringImport;
      } else {
        document.getElementById('locations').innerHTML =
          "<tr><td colspan='4'><p class='text-center'>Additional stores coming soon</p></td></tr>";
      }
    });
}

function goldRush(locationType) {
  let constInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    cache: 'default',
  };

  let constRequest = new Request('/js/gold-rush.json', constInit);
  let stringImport = '';
  let addImage = '';
  let openingTypeString = '';

  fetch(constRequest)
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      for (let x = 0; x < data.length; x++) {
        if (dateCompare(data[x].EndDate)) {
          if (data[x].StoreType == 'New') {
            addImage =
              '<img src="/images/stores/red-mountains.svg" class="img-fluid" style="max-width:64px;" alt="New" />';
            openingTypeString = 'Opens';
          } else {
            addImage =
              '<img src="/images/stores/red-mountains-outline.svg" class="img-fluid" style="max-width:64px;" alt="Remodeled" />';
            openingTypeString = 'Re-opens';
          }
          stringImport +=
            '<div class="col-lg-3 col-md-6 col-sm-12 text-center mb-4">';
          stringImport += addImage;
          stringImport +=
            '<h4 class="pt-2 mb-0">' + data[x].StoreLocation + '</h4>';
          stringImport +=
            '<p><a href="https://www.google.com/maps/search/?api=1&query=' +
            encodeURIComponent(data[x].Address + ' ' + data[x].Address2) +
            "\" target='_blank' title='Maverik Location'\">";
          stringImport += data[x].Address + '<br />';
          stringImport += data[x].Address2 + '</a></p>';
          stringImport +=
            '<p>Sweepstakes open<br />from ' +
            niceDate(data[x].StartDate) +
            '<br /> to ';
          stringImport += niceDate(data[x].EndDate) + '</p>';
          stringImport += '<p>Tag photos with<br />' + data[x].HashTag + '</p>';
          stringImport +=
            '<p><a href="/stores/rules/' +
            data[x].Rules +
            '" target="_blank" />See Rules</a></p>';
          stringImport += '</div>';
        }
      }
      if (stringImport != '') {
        document.getElementById('locations').innerHTML = stringImport;
      } else {
        document.getElementById('locations').innerHTML =
          "<tr><td colspan='4'><p class='text-center'>Additional stores coming soon</p></td></tr>";
      }
    });
}

function initCarousel() {
  let constInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    cache: 'default',
  };

  let bannerRequest = new Request('/js/carousel.json', constInit);
  let linkString = '';
  let stringImport = '';
  let target = '';

  fetch(bannerRequest)
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      for (let x = 0; x < data.length; x++) {
        if (x == 0) {
          stringImport += '<div class="carousel-item active">';
        } else {
          stringImport += '<div class="carousel-item">';
        }
        stringImport +=
          '<img src="/images/carousel/' +
          data[x].image +
          '" class="d-block w-100" alt="' +
          data[x].name +
          '">';
        stringImport += '<div class="carousel-caption">';
        stringImport += '<h1>' + data[x].headline + '</h1>';
        stringImport += '<p class="subtext">' + data[x].subtext + '</p>';
        stringImport += '<p>';
        if (data[x].button1.text != '') {
          if (data[x].button1.target == 'new') {
            target = "target='_blank'";
          }
          linkString =
            'utm_source=mav_web&utm_medium=carousel&utm_campaign=' +
            data[x].campaignID +
            '&utm_content=' +
            data[x].button1.campaignContent;
          stringImport +=
            '<a class="btn" href="' +
            data[x].button1.url +
            '?' +
            linkString +
            '" ' +
            target +
            '>' +
            data[x].button1.text +
            '</a>';
        }
        if (data[x].button2.text != '') {
          if (data[x].button2.target == 'new') {
            target = "target='_blank'";
          }
          linkString =
            'utm_source=mav_web&utm_medium=carousel&utm_id=' +
            data[x].campaignID +
            '&utm_content=' +
            data[x].button2.campaignContent;
          stringImport +=
            '<a class="btn btnwhite" href="' +
            data[x].button2.url +
            '?' +
            linkString +
            '" ' +
            target +
            '>' +
            data[x].button2.text +
            '</a></p>';
        }

        linkString = '';

        stringImport += '</div>';
        stringImport += '</div>';
      }
      document.getElementById('carouselInner').innerHTML = stringImport;
    });
}

function initPress(mediaType) {
  let constInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    cache: 'default',
  };

  let prefix = '';
  let newsRequest = '';

  switch (mediaType) {
    case 'pressRelease':
      newsRequest = new Request('/media/js/press-releases.json', constInit);
      prefix = '/media/press-releases/';
      break;
    default:
      newsRequest = new Request('/media/js/news-articles.json', constInit);
  }
  let stringImport = '';

  fetch(newsRequest)
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      stringImport += '<ul class="fancylist no-bullet">';
      for (let x = 0; x < data.length; x++) {
        stringImport +=
          '<li><a href="' +
          prefix +
          data[x].fullStoryLink +
          '" target="_blank">' +
          data[x].headline +
          '</a>';
        if (data[x].outlet) {
          stringImport += '<br />' + data[x].outlet;
        }
        stringImport += '<br /><span class="">' + data[x].date + '</span></li>';
      }

      document.getElementById('press-releases').innerHTML = stringImport;
    });
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function randomPhoto() {
  let imgList = [1, 2, 3, 4, 5, 6, 7];
  shuffleArray(imgList);
  let outputString = '';
  outputString += '<div class="col-md-4 col-sm-12">';
  outputString +=
    '<img src="images/locations/location-image-' +
    imgList[0] +
    '.jpg" class="img-fluid rounded-corners" alt="Locations 1">';
  outputString += '</div>';
  outputString += '<div class="col-md-4 col-sm-12 d-none d-md-block">';
  outputString +=
    '<img src="images/locations/location-image-' +
    imgList[1] +
    '.jpg" class="img-fluid rounded-corners" alt="Locations 2">';
  outputString += '</div>';
  outputString += '<div class="col-md-4 col-sm-12 d-none d-md-block">';
  outputString +=
    '<img src="images/locations/location-image-' +
    imgList[2] +
    '.jpg" class="img-fluid rounded-corners" alt="Locations 3">';
  outputString += '</div>';
  document.getElementById('image-row').innerHTML = outputString;
}

var isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return (
      navigator.userAgent.match(/IEMobile/i) ||
      navigator.userAgent.match(/WPDesktop/i)
    );
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

function magicAppButton() {
  if (isMobile.Android()) {
    document.getElementById('AppDownloadLink').innerHTML =
      '<a href="https://play.google.com/store/apps/details?id=com.maverik.rewards" class="btn">Download App</a>';
  } else if (isMobile.iOS()) {
    document.getElementById('AppDownloadLink').innerHTML =
      '<a href="https://apps.apple.com/us/app/maverik-app/id592161957" class="btn">Download App</a>';
  } else {
    document.getElementById('AppDownloadLink').innerHTML =
      '<a href="https://maverik.com/rewards/index.html" class="btn">Download App</a>';
  }
}

function niceDate(dateinfo) {
  const d = new Date(dateinfo);
  let name = month[d.getMonth()];
  let day = d.getDate();
  let year = d.getFullYear();
  return name + ' ' + day + ', ' + year;
}
