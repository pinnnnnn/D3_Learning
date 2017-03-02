// Subscribe to the PubNub wikipedia feed
PUBNUB.init({
  subscribe_key: 'sub-c-b0d14910-0601-11e4-b703-02ee2ddab7fe'
}).subscribe({
  channel: 'pubnub-wikipedia',
  message: function(msg) {
    // Log the message to the console
    showMessage(msg);
  }
});

function showMessage (msg) {
	var left = Math.random()*window.innerWidth;
	var top = Math.random()*window.innerHeight;
	var div = d3.select('body')
	.append('div')
	.attr('class', 'linkbox')
	.attr('style', "left: " + left +"px;" + "top: " + top +"px;")
	div.append('a')
	.attr('href', msg.link)
	.text(msg.item)
	div.style("opacity", 1)
	.transition()
	.duration(5000)
	.style("opacity", 0)
	.remove();
}
