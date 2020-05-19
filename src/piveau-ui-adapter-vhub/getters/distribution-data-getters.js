import {
  has, isNil, isArray, isString, isObject,
} from 'lodash';

const getters = {
  getAccessUrl: (parent) => {
    // Default url
    let accessUrl;
    // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
    if (has(parent, 'access_url') && !isNil(parent.access_url)) accessUrl = parent.access_url;
    return accessUrl;
  },
  getDescription: (parent) => {
    // Default Object
    const description = {};
    if (!has(parent, 'description') || isNil(parent.description) || !isObject(parent.description)) {
      description.en = 'No description given';
      return description;
    }
    // Check if present keys not Nil. Replace default value with real value if check passed.
    Object.keys(parent.description).forEach((key) => {
      if (!isNil(parent.description[key])) description[key] = parent.description[key];
    });
    return description;
  },
  getDocumentations: (parent) => {
    // Default Array
    const documentations = [];
    // Return default array if key not present in parent
    if (!has(parent, 'documentations') || isNil(parent.documentations) || !isArray(parent.documentations)) return documentations;
    for (const d of parent.documentations) {
      // Check if value not Nil. Replace default value with real value if check passed.
      if (!isNil(d)) documentations.push(d);
    }
    return documentations;
  },
  getDownloadUrls: (parent) => {
    // Default Array
    const downloadUrls = [];
    // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
    if (!has(parent, 'download_urls') || isNil(parent.download_urls) || !isArray(parent.download_urls)) return downloadUrls;
    for (const d of parent.download_urls) {
      if (!isNil(d)) downloadUrls.push(d);
    }
    return downloadUrls;
  },
  getFormat: (parent) => {
    // Default Object
    const format = {
      id: undefined,
      title: 'UNKNOWN',
    };
    // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
    if (has(parent, 'format.id') && !isNil(parent.format.id)) format.id = parent.format.id;
    if (has(parent, 'format.title') && !isNil(parent.format.title)) format.title = parent.format.title;
    return format;
  },
  getId: (parent) => {
    // Default id
    let id;
    // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
    if (has(parent, 'id') && !isNil(parent.id)) id = parent.id;
    return id;
  },
  getLanguages: (parent) => {
    // Default Array
    const languages = [];
    // Return default array if key not present in parent
    if (!has(parent, 'languages') || isNil(parent.languages) || !isArray(parent.languages)) return languages;
    for (const l of parent.languages) {
      // Check if value not Nil and is String. Replace default value with real value if check passed.
      if (!isNil(l) && isString(l)) languages.push(l);
    }
    return languages;
  },
  getLicence: (parent) => {
    // Default Object
    const licence = {
      id: undefined,
      title: undefined,
      resource: undefined,
      description: undefined,
      la_url: undefined,
    };
    // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
    if (has(parent, 'licence.id') && !isNil(parent.licence.id)) licence.id = parent.licence.id;
    if (has(parent, 'licence.title') && !isNil(parent.licence.title)) licence.title = parent.licence.title;
    if (has(parent, 'licence.resource') && !isNil(parent.licence.resource)) licence.resource = parent.licence.resource;
    if (has(parent, 'licence.description') && !isNil(parent.licence.description)) licence.description = parent.licence.description;
    if (has(parent, 'licence.la_url') && !isNil(parent.licence.la_url)) licence.la_url = parent.licence.la_url;
    return licence;
  },
  getModificationDate: (parent) => {
    // Default date
    let modificationDate;
    // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
    if (has(parent, 'modification_date') && !isNil(parent.modification_date)) modificationDate = parent.modification_date;
    return modificationDate;
  },
  getReleaseDate: (parent) => {
    // Default date
    let releaseDate;
    // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
    if (has(parent, 'release_date') && !isNil(parent.release_date)) releaseDate = parent.release_date;
    return releaseDate;
  },
  getTitle: (parent) => {
    const title = {};
    // Check if necessary keys present and not Nil. Return default object if key not present in parent
    if (!has(parent, 'title') || isNil(parent.title) || !isObject(parent.title)) {
      title.en = getters.getAccessUrl();
      return title;
    }
    // Check if present keys not Nil. Replace default value with real value if check passed.
    Object.keys(parent.title).forEach((key) => {
      if (!isNil(parent.title[key])) title[key] = parent.title[key];
    });
    return title;
  },
};
export default getters;
