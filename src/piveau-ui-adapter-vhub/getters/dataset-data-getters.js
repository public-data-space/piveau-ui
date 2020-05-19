import {
  has, isNil, isArray, isString, isObject,
} from 'lodash';

const getters = {
  getCatalog: (parent) => {
    // Default Object
    const catalog = {
      id: undefined,
      title: undefined,
      description: undefined,
    };
    // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
    if (has(parent, 'catalog.id') && !isNil(parent.catalog.id)) catalog.id = parent.catalog.id;
    if (has(parent, 'catalog.title') && !isNil(parent.catalog.title)) catalog.title = parent.catalog.title;
    if (has(parent, 'catalog.description') && !isNil(parent.catalog.description)) catalog.description = parent.catalog.description;
    return catalog;
  },
  getCategories: (parent) => {
    // Default Array
    const categories = [];
    // Return default array if key not present in parent
    if (!has(parent, 'categories')) return categories;
    if (!isArray(parent.categories)) return categories;
    for (const c of parent.categories) {
      const category = {
        id: undefined,
        title: undefined,
        resource: undefined,
      };
      // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
      if (has(c, 'id') && !isNil(c.id)) category.id = c.id;
      if (has(c, 'title') && !isNil(c.title)) category.title = c.title;
      if (has(c, 'resource') && !isNil(c.resource)) category.resource = c.resource;
      // If all values inside the object are undefined or null, do not add the object to the displayed array and continue
      if (!isNil(c.id) || !isNil(c.title) || !isNil(c.resource)) {
        categories.push(category);
      }
    }
    return categories;
  },
  getConformsTo: (parent) => {
    // Default Array
    const conformsTos = [];
    // Return default array if key not present in parent
    if (!has(parent, 'conforms_to')) return [];
    if (!isArray(parent.conforms_to)) return [];
    for (const c of parent.conforms_to) {
      const conformsTo = {
        title: undefined,
        resource: undefined,
      };
      // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
      if (has(c, 'title') && !isNil(c.title)) conformsTo.title = c.title;
      if (has(c, 'resource') && !isNil(c.resource)) conformsTo.resource = c.resource;
      if (!isNil(c.title) || !isNil(c.resource)) {
        conformsTos.push(conformsTo);
      }
    }
    return conformsTos;
  },
  getContactPoints: (parent) => {
    // Default Array
    const contactPoints = [];
    // Return default array if key not present in parent
    if (!has(parent, 'contact_points')) return [];
    if (!isArray(parent.contact_points)) return [];
    for (const c of parent.contact_points) {
      const contactPoint = {
        type: undefined,
        name: undefined,
        email: undefined,
        resource: undefined,
      };
      // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
      if (has(c, 'type') && !isNil(c.type)) contactPoint.type = c.type;
      if (has(c, 'name') && !isNil(c.name)) contactPoint.name = c.name;
      if (has(c, 'email') && !isNil(c.email)) contactPoint.email = c.email;
      if (has(c, 'resource') && !isNil(c.resource)) contactPoint.resource = c.resource;
      // If all values inside the object are undefined or null, do not add the object to the displayed array and continue
      if (!isNil(c.type) || !isNil(c.name) || !isNil(c.email) || !isNil(c.resource)) {
        contactPoints.push(contactPoint);
      }
    }
    return contactPoints;
  },
  getCountry: (parent) => {
    // Default Object
    const country = {
      id: 'ids',
      title: 'International Data Spaces',
    };
    // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
    if (has(parent, 'country.id') && !isNil(parent.country.id)) country.id = parent.country.id;
    if (has(parent, 'country.title') && !isNil(parent.country.title)) country.title = parent.country.title;
    return country;
  },
  getDescription: (parent) => {
    // Default Object
    const description = {};
    if (!has(parent, 'description') || isNil(parent.description) || !isObject(parent.description)) {
      description.en = 'No description available';
      return description;
    }
    // Check if present keys not Nil. Replace default value with real value if check passed.
    Object.keys(parent.description).forEach((key) => {
      if (!isNil(parent.description[key])) description[key] = parent.description[key];
    });
    return description;
  },
  getDistributions: (parent) => {
    // Default Array
    const distributions = [];
    if (!has(parent, 'distributions')) return distributions;
    if (!isArray(parent.distributions)) return distributions;
    for (const d of parent.distributions) {
      let distribution;
      // Check if value not Nil. Replace default value with real value if check passed.
      if (!isNil(d) && isObject(d)) {
        distribution = d;
        distributions.push(distribution);
      }
    }
    return distributions;
  },
  getDocumentations: (parent) => {
    // Default Array
    const documentations = [];
    // Return default array if key not present in parent
    if (!has(parent, 'documentations')) return documentations;
    if (!isArray(parent.documentations)) return documentations;
    for (const d of parent.documentations) {
      let documentation;
      // Check if value not Nil. Replace default value with real value if check passed.
      if (!isNil(d)) {
        documentation = d;
        documentations.push(documentation);
      }
    }
    return documentations;
  },
  getFrequency: (parent) => {
    // Default Object
    const frequency = {
      title: undefined,
      resource: undefined,
    };
    // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
    if (has(parent, 'frequency.title') && !isNil(parent.frequency.title)) frequency.title = parent.frequency.title;
    if (has(parent, 'frequency.resource') && !isNil(parent.frequency.resource)) frequency.resource = parent.frequency.resource;
    return frequency;
  },
  getId: (parent) => {
    // Default id
    let id;
    // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
    if (has(parent, 'id') && !isNil(parent.id)) id = parent.id;
    return id;
  },
  getIdentifiers: (parent) => {
    // Default Array
    const identifiers = [];
    // Return default array if key not present in parent
    if (!has(parent, 'identifiers')) return [];
    if (!isArray(parent.identifiers)) return [];
    for (const i of parent.identifiers) {
      let identifier;
      // Check if value not Nil. Replace default value with real value if check passed.
      if (!isNil(i) && isString(i)) {
        identifier = i;
        identifiers.push(identifier);
      }
    }
    return identifiers;
  },
  getIdName: (parent) => {
    // Default id
    let idName;
    // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
    if (has(parent, 'idName') && !isNil(parent.idName)) idName = parent.idName;
    return idName;
  },
  getKeywords: (parent) => {
    // Default Array
    const keywords = [];
    // Return default array if key not present in parent
    if (!has(parent, 'keywords')) return keywords;
    if (!isArray(parent.keywords)) return keywords;
    for (const k of parent.keywords) {
      const keyword = {
        id: undefined,
        title: undefined,
      };
      // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
      if (has(k, 'id') && !isNil(k.id)) keyword.id = k.id;
      if (has(k, 'title') && !isNil(k.title)) keyword.title = k.title;
      // If all values inside the object are undefined or null, do not add the object to the displayed array and continue
      if (!isNil(k.id) || !isNil(k.title)) {
        keywords.push(keyword);
      }
    }
    return keywords;
  },
  getLanguages: (parent) => {
    // Default Array
    const languages = [];
    // Return default array if key not present in parent
    if (!has(parent, 'languages')) return languages;
    if (!isArray(parent.languages)) return languages;
    for (const l of parent.languages) {
      let language;
      // Check if value not Nil and is String. Replace default value with real value if check passed.
      if (!isNil(l) && isString(l)) {
        language = l;
        languages.push(language);
      }
    }
    return languages;
  },
  getLandingPages: (parent) => {
    // Default Array
    const landingPages = [];
    // Return default array if key not present in parent
    if (!has(parent, 'landing_page')) return landingPages;
    if (!isArray(parent.landing_page)) return landingPages;
    for (const l of parent.landing_page) {
      let landingPage = '-';
      // Check if value not Nil. Replace default value with real value if check passed.
      if (!isNil(l) && isString(l)) {
        landingPage = l;
        landingPages.push(landingPage);
      }
    }
    return landingPages;
  },
  getModificationDate: (parent) => {
    // Default date
    let modificationDate;
    // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
    if (has(parent, 'modification_date') && !isNil(parent.modification_date)) modificationDate = parent.modification_date;
    return modificationDate;
  },
  getOriginalLanguage: (parent) => {
    // Default Object
    let originalLanguage;
    // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
    if (has(parent, 'translation_meta') && has(parent, 'translation_meta.details') && !isNil(parent.translation_meta.details) && isObject(parent.translation_meta.details)) {
      Object.keys(parent.translation_meta.details).forEach((key) => {
        if (has(parent.translation_meta.details[key], 'original_language')) originalLanguage = parent.translation_meta.details[key].original_language;
      });
    }
    return originalLanguage;
  },
  getOtherIdentifiers: (parent) => {
    // Default Array
    const otherIdentifiers = [];
    // Return default array if key not present in parent
    if (!has(parent, 'other_identifiers')) return otherIdentifiers;
    if (!isArray(parent.other_identifiers)) return otherIdentifiers;
    for (const i of parent.other_identifiers) {
      let otherIdentifier;
      // Check if value not Nil. Replace default value with real value if check passed.
      if (!isNil(i) && isString(i)) {
        otherIdentifier = i;
        otherIdentifiers.push(otherIdentifier);
      }
    }
    return otherIdentifiers;
  },
  getProvenances: (parent) => {
    // Default Array
    const provenances = [];
    // Return default array if key not present in parent
    if (!has(parent, 'provenances')) return provenances;
    if (!isArray(parent.provenances)) return provenances;
    for (const p of parent.provenances) {
      const provenance = {
        label: undefined,
        resource: undefined,
      };
      // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
      if (has(p, 'label') && !isNil(p.label)) provenance.label = p.label;
      if (has(p, 'resource') && !isNil(p.resource)) provenance.resource = p.resource;
      // If all values inside the object are undefined or null, do not add the object to the displayed array and continue
      if (!isNil(p.label) || !isNil(p.resource)) {
        provenances.push(provenance);
      }
    }
    return provenances;
  },
  getPublisher: (parent) => {
    // Default Object
    const publisher = {
      type: undefined,
      name: undefined,
      email: undefined,
      resource: undefined,
    };
    // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
    if (has(parent, 'publisher.type') && !isNil(parent.publisher.type)) publisher.type = parent.publisher.type;
    if (has(parent, 'publisher.name') && !isNil(parent.publisher.name)) publisher.name = parent.publisher.name;
    if (has(parent, 'publisher.email') && !isNil(parent.publisher.email)) publisher.email = parent.publisher.email;
    if (has(parent, 'publisher.resource') && !isNil(parent.publisher.resource)) publisher.resource = parent.publisher.resource;
    return publisher;
  },
  getRelatedResources: (parent) => {
    // Default Array
    const relatedResources = [];
    // Return default array if key not present in parent
    if (!has(parent, 'related_resources')) return relatedResources;
    if (!isArray(parent.related_resources)) return relatedResources;
    for (const r of parent.related_resources) {
      let relatedResource;
      // Check if value not Nil and is String. Replace default value with real value if check passed.
      if (!isNil(r) && isString(r)) {
        relatedResource = r;
        relatedResources.push(relatedResource);
      }
    }
    return relatedResources;
  },
  getReleaseDate: (parent) => {
    // Default date
    let releaseDate;
    // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
    if (has(parent, 'release_date') && !isNil(parent.release_date)) releaseDate = parent.release_date;
    return releaseDate;
  },
  getSources: (parent) => {
    // Default Array
    const sources = [];
    // Return default array if key not present in parent
    if (!has(parent, 'sources')) return sources;
    if (!isArray(parent.sources)) return sources;
    for (const s of parent.sources) {
      let source;
      // Check if value not Nil and is String. Replace default value with real value if check passed.
      if (!isNil(s) && isString(s)) {
        source = s;
        sources.push(source);
      }
    }
    return sources;
  },
  getSpatial: (parent) => {
    // Default Object
    const spatial = {
      coordinates: undefined,
      type: undefined,
    };
    // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
    if (has(parent, 'spatial.coordinates') && !isNil(parent.spatial.coordinates)) spatial.coordinates = parent.spatial.coordinates;
    if (has(parent, 'spatial.type') && !isNil(parent.spatial.type)) spatial.type = parent.spatial.type;
    return spatial;
  },
  getTranslationMetaData: (parent) => {
    // Default Object
    const translationMetaData = {
      fullAvailableLanguages: [],
      details: {},
      status: undefined,
    };
    // Check if necessary keys present and not Nil. Return default object if key not present in parent
    if (!has(parent, 'translation_meta')) return translationMetaData;
    if (isNil(parent.translation_meta) || !isObject(parent.translation_meta)) return translationMetaData;
    // Check if nested keys present and not Nil.
    if (has(parent, 'translation_meta.full_available_languages') && !isNil(parent.translation_meta.full_available_languages)) {
      for (const l of parent.translation_meta.full_available_languages) {
        if (!isNil(parent.translation_meta.full_available_languages[l])) translationMetaData.fullAvailableLanguages.push(l);
      }
    }
    if (has(parent, 'translation_meta.details') && !isNil(parent.translation_meta.details)) {
      Object.keys(parent.translation_meta.details).forEach((key) => {
        if (!isNil(parent.translation_meta.details[key])) translationMetaData.details[key] = parent.translation_meta.details[key];
      });
    }
    if (has(parent, 'translation_meta.status') && !isNil(parent.translation_meta.status)) translationMetaData.status = parent.translation_meta.status;
    return translationMetaData;
  },
  getTitle: (parent) => {
    // Default Object
    const title = {};
    // Check if necessary keys present and not Nil. Return default object if key not present in parent
    if (!has(parent, 'title')) return title;
    if (isNil(parent.title) || !isObject(parent.title)) return title;
    // Check if present keys not Nil. Replace default value with real value if check passed.
    Object.keys(parent.title).forEach((key) => {
      if (!isNil(parent.title[key])) title[key] = parent.title[key];
    });
    return title;
  },
  getAccessRight: undefined,
  getHasVersions: undefined,
  getIsVersionOf: undefined,
  getTemporalCoverages: undefined,
  getVersion: undefined,
  getVersionNotes: undefined,
};
export default getters;
