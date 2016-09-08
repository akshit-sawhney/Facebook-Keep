var ApiComponent = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
            this.loadContent();
            setInterval(this.loadContent(), this.props.polling);
    },
    loadContent: function() {
        $.ajax({
          url: this.props.url,
          dataType: 'json',
          cache: false,
          success: function(data) {
            this.setState({data: data});
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },
    render: function() {
        var imageList = this.state.data.map(function(image) {
            return (
                <div>
                <a id={image.id}><img src={image.url} />{image.name}</a>
                </div>
            );
        });
        return (
            <div>
                {imageList}
            </div>
        );
    }
});
ReactDOM.render(<ApiComponent url='sample.js'polling={2000}/>, document.getElementById('content'));
