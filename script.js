var ROOT_URL = 'https://www.googleapis.com/youtube/v3/search';

var YTSearch = function (options, callback) {
  if (!options.key) {
    throw new Error('Youtube Search expected key, received undefined');
  }

  var params = {
    part: 'snippet',
    key: options.key,
    q: options.term,
    type: 'video' };


  axios.get(ROOT_URL, {
    params: params }).

  then(function (response) {
    if (callback) {
      callback(response.data.items);
    }
  }).
  catch(function (error) {
    console.error(error);
  });
};

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '' };

  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "search-bar" }, /*#__PURE__*/
      React.createElement("input", {
        value: this.state.term,
        onChange: event => this.onInputChange(event.target.value) })));


  }
  onInputChange(term) {
    this.setState({
      term });

    this.props.onSearchTermChange(term);
  }}


const VideoDetail = ({
  video }) =>
{
  if (!video) {
    return /*#__PURE__*/(
      React.createElement("div", null, "Loading..."));



  }
  const videoId = video.id.vedeoId;
  const url = `https://www.youtube.com/embed/${videoId}`; //templatestring
  return /*#__PURE__*/(
    React.createElement("div", { className: "video-detail col-md-8" }, /*#__PURE__*/
    React.createElement("div", { className: "embed-responsive embed-responsive-16by9" }, /*#__PURE__*/
    React.createElement("iframe", { className: "embed-responsive-item", src: url })), /*#__PURE__*/

    React.createElement("div", { className: "details" }, /*#__PURE__*/
    React.createElement("div", null, video.snippet.title), /*#__PURE__*/
    React.createElement("div", null, video.snippet.description))));



};

const VideoListItem = ({
  video,
  onVideoSelect }) =>
{
  const imageURL = video.snippet.thumbnails.default.url;
  //const video = props.video; is the same is passing the object video
  console.log(video.snippet);
  return /*#__PURE__*/(
    React.createElement("li", { onClick: () => onVideoSelect(video), className: "list-group-item" }, /*#__PURE__*/
    React.createElement("div", { className: "video-list media" }, /*#__PURE__*/
    React.createElement("div", { className: "media-left" }, /*#__PURE__*/
    React.createElement("img", { className: "media-object", src: imageURL })), /*#__PURE__*/

    React.createElement("div", { className: "media-body" }, /*#__PURE__*/
    React.createElement("div", { className: "media-heading" },
    video.snippet.title)))));





};

const VideoList = props => {
  const videoItems = props.videos.map(video => {
    return /*#__PURE__*/(
      React.createElement(VideoListItem, {
        onVideoSelect: props.onVideoSelect,
        key: video.etag,
        video: video }));

  });
  return /*#__PURE__*/(
    React.createElement("ul", { className: "col-md-4 list-group" },
    videoItems));


};

const API_KEY = 'AIzaSyCOn03va0TM78D1cGrUIYL8B5HtpCDC49I';

//Create a new component. This component should produce HTML
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null };


    this.videoSearch('deadmau5');
  }
  videoSearch(term) {
    YTSearch({
      key: API_KEY,
      term: term },
    videos => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0] });

    });
  }
  render() {
    const videoChange = _.debounce(term => {
      this.videoSearch(term);
    }, 300);
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement(SearchBar, { onSearchTermChange: videoChange }), /*#__PURE__*/
      React.createElement(VideoDetail, { video: this.state.selectedVideo }), /*#__PURE__*/
      React.createElement(VideoList, {
        onVideoSelect: selectedVideo => this.setState({ selectedVideo }),
        videos: this.state.videos })));


  }}


//Take this component's generated HTML and put it on the page
ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.querySelector('.container'));