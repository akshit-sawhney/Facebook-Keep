var NavigationComponent = React.createClass( {
    getInitialState: function() {
        return {focused: 0};
    },
    clicked: function(index) {
        this.setState({focused: index});
    },
    render: function() {
        var self = this;
        return (
            <div>
            <ul>{ this.props.items.map(function(m, index) {
                var style= '';
                if(self.state.focused == index) {
                    style = 'focused';
                }
                return <li className={style} key={index} onClick={self.clicked.bind(self, index)}>{m}</li>;
            })}
            </ul>
            <p> Selected: {this.props.items[this.state.focused]}</p>
            </div>
        )
    }
});

ReactDOM.render(<NavigationComponent  items={ ['Home', 'Services', 'About', 'Contact us'] } />, document.getElementById('content'));
