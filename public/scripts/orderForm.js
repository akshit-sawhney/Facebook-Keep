var OrderFormComponent = React.createClass({
    getInitialState: function() {
        return {total: 0};
    },
    addCost: function(price) {
            this.setState({total: this.state.total + price});
    },
    render: function() {
        var self = this;
        var services = this.props.items.map(function(s) {
            return <OrderIndividual name={s.name} price={s.price} active={s.active} addCost={self.addCost} />;
        })
        return (
            <div>
            <h1>OUR SERVICES</h1>
            <div id="services">
            {services}
            <p id="total">TOTAL  <b>{this.state.total.toFixed(2)}</b></p>
            </div>
            </div>
        )
    }
});

var OrderIndividual = React.createClass({
    getInitialState: function() {
        return {active: false}
    },
    clickFunction: function() {
            var active = !this.state.active;
            this.setState({active: active});
            this.props.addCost(active ? this.props.price : -this.props.price);
    },
    render: function() {
        return (
            <p className={this.state.active ? 'active' : ''} onClick={this.clickFunction}>
            {this.props.name} <b>{this.props.price.toFixed(2)}</b>

            </p>
        )
    }
});

var services = [
    { name: 'Web Development', price: 300 },
    { name: 'Design', price: 400 },
    { name: 'Integration', price: 250 },
    { name: 'Training', price: 220 }
];

ReactDOM.render(<OrderFormComponent items={ services }  />, document.getElementById('content'));
