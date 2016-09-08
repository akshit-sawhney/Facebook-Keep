var TimerComponent = React.createClass({
    getInitialState: function() {
        return {myTime: 0};
    },
    componentDidMount: function() {
        this.timer = setInterval(this.myFunction, 50);
    },
    componetWillUnmount: function() {
            clearInterval(this.timer);
    },
    myFunction: function() {
        this.setState({myTime: new Date() - this.props.start});
    },
    render: function() {
        var calculation = Math.round(this.state.myTime / 100);
        var secondsCalculated = (calculation / 10).toFixed(1);
        return <p> You have been using React since {secondsCalculated} seconds.</p>
    }

});
ReactDOM.render(<TimerComponent start={Date.now()} />, document.getElementById('content'));
