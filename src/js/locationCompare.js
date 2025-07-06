export function dateCompare6weeks(dateToCompare) {
  var givenDate = dateToCompare;
  var currentDate = new Date();
  var maxDate = new Date();
  var minDate = new Date();

  const dateWindowMax = maxDate.setDate(currentDate.getDate() + 56);
  const dateWindowMin = minDate.setDate(currentDate.getDate() - 14);

  givenDate = new Date(givenDate);
  if (givenDate >= dateWindowMin && givenDate <= dateWindowMax) {
    return 1;
  } else {
    return null;
  }
}

export function listActive(startDate, endDate) {
  var compareStart = new Date(startDate);
  var compareEnd = new Date(endDate);
  var currentDate = new Date();
  var maxDate = new Date();
  var minDate = new Date();

  if (currentDate >= compareStart && (!endDate || currentDate <= compareEnd)) {
    return true;
  } else {
    return false;
  }
}

export function listUpcoming(startDate, endDate) {
  var compareStart = new Date(startDate);
  var compareEnd = new Date(endDate);
  var currentDate = new Date();
  var maxDate = new Date();
  var minDate = new Date();

  if (currentDate <= compareStart) {
    return 1;
  } else {
    return null;
  }
}

export function listPastReleases(startDate, endDate) {
  var compareStart = new Date(startDate);
  var compareEnd = new Date(endDate);
  var currentDate = new Date();
  var maxDate = new Date();
  var minDate = new Date();

  if (currentDate >= compareEnd) {
    return 1;
  } else {
    return null;
  }
}
