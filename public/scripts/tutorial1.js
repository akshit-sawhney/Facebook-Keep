var data = [
  {id: 1, author: "Cristiano Ronaldo", text: "The best in the world"},
  {id: 2, author: "Gareth Bale", text: "The flag-bearer"}
];
var CommentList = React.createClass({
    render: function() {
        var commentNotes = this.props.data.map(function(comment) {
            return (
                <Comment author={comment.author} key={comment.id}>{comment.text}</Comment>
            );
        });
        return (
            <div className="commentListClass">
                {commentNotes}
            </div>
        );
    }
});

var CommentForm = React.createClass({
    render: function() {
        return (
                <div className="commentFormClass">
                GARETH BALE FORM
                </div>
        );
    }
});

var Comment = React.createClass({
    rawMarkup : function() {
        var md = new Remarkable();
        var raw = md.render(this.props.children.toString());
        return {__html: raw};
    },
    render: function() {
        return (
            <div className="commentClass">
            <h2 className="headingClass">{this.props.author}</h2>
            <span dangerouslySetInnerHTML={this.rawMarkup()} />
            </div>
        );
    }
});

var CommentBox = React.createClass({
    ///getInitialState is the function which is triggered only once in the lifetime of a react component.(Use it for initialization)
    getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
      this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  loadCommentsFromServer: function() {
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
        return (
            <div className="commentBox">
                <h1>HALA MADRID.....I AM A COMMENT BOX</h1>
                <CommentList data={this.state.data} />
                <CommentForm />
            </div>
        );
    }
    ///These div tags are not actual HTML nodes, but instantiations of react div components.
});
ReactDOM.render(
    <CommentBox url="/api/comments" pollInterval={2000} />, document.getElementById('content')
);
