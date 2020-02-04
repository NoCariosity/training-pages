const api = 'https://websitetestdata.arlo.co/api/2012-02-01/pub/resources';
const eventSearch = `${api}/eventsearch/?format=json`;
const eventTemplateSearch = `${api}/eventtemplatesearch/?format=json`;

// fetch region, category date
export const getRegionsAndCategories = () => fetch(
  `${eventSearch}&facets=state,templatecategory&top=0`
).then(res => res.json());

//fetch all course templates without filters
export const getAllCourses = () => fetch(
  `${eventTemplateSearch}&fields=TemplateID,Code,Name,Description,Categories,Tags,ViewUri`
).then(res => res.json());

// fetch course template IDs with filtes: region, start date, end date, category
export const getCourseIDs = ({category, region, from, to} = {category: '12', region: 'NWS', from: new Date('January 28, 2022'), to: new Date('June 30, 2023')}) => {
  let url;
  let startDate = from.toISOString().slice(0, 11) + '00:00:00.0000000';
  let endDate = to.toISOString().slice(0, 11) + '23:59:59.0000000'; // TODO: uncomment it
  // let endDate = '2023-12-31T00:00:00.0000000';
  url = `${eventSearch}&facets=template&facetsfilter=` 
  + `${category === 'all'? '' : 'templatecategoryid=' + category + ','}` 
  + `${region === 'all'? '' : 'state=' + region  + ','}` 
  + `startmin=${startDate},startmax=${endDate}` 
  + `&top=50`;
  return fetch(url).then(res => res.json());
};

//fetch course templates with filters template IDs
export const getCourses = (courseCodes) => {
  if(courseCodes.length <= 32){
    return fetch(
      `${eventTemplateSearch}&filter=templateid=[${courseCodes}]&fields=TemplateID,Code,Name,Description,Categories,Tags,ViewUri&top=20`
    ).then(res => res.json());
  }else {
    // TODO
    // courseCodes.length >= 32;
    // return fetch(
    //   `${eventTemplateSearch}&filter=templateid=[${courseCodes}]&fields=TemplateID,Code,Name,Description,Categories,Tags,ViewUri&top=20`
    // ).then(res => res.json());
  }
  
};