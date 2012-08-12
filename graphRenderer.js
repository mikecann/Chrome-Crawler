// JavaScript Document

var rgraph = null;

function generateJSON() 
{
	var startingPage = bgPage.startingPage;
	var json = {name:startingPage.parsed.host, children:[]};
	
	var count = 0; 
	for(var ref in bgPage.allPages) 
	{
		var o = bgPage.allPages[ref];
		if(o.depth==1)
		{
			//var parsed = parseUri(o.url);
			//json.children.push({name:""+count});
		}
	}

	return json;
}

function renderGraph(){
			
	/*var json = 
	{
		"id": "0",
        "name": "a",
        "children": [{"id":"1","name": "a1"},{"id":"2","name": "a2"},{"id":"3","name": "a3"}]		
	}*/
	
	var json = generateJSON();

    //init RGraph
	if(!rgraph)
	{
		rgraph = new $jit.RGraph({
			'injectInto': 'infovis',
		  
			//Set Edge and Node colors.
			Node: {
				color: '#ff0000',
				overridable:true
			},
	
			Edge: {
				overridable:true,
				color: '#000000',
				lineWidth:1.5
			},
			
			Navigation: {  
				enable: true,  
				panning: 'avoid nodes',  
				zooming: 20  
			  } ,
			
			//Add the node's name into the label
			//This method is called only once, on label creation.
			onCreateLabel: function(domElement, node){
				domElement.innerHTML = node.name;
			},
	
			//Change the node's style based on its position.
			//This method is called each time a label is rendered/positioned
			//during an animation.
			onPlaceLabel: function(domElement, node){
				var style = domElement.style;
				style.display = '';
	
				if (node._depth <= 1) {
					style.fontSize = "0.8em";
					style.color = "#0000ff";
				
				} else if(node._depth == 2){
					style.fontSize = "0.7em";
					style.color = "#494949";
				
				} else {
					style.display = 'none';
				}
	
				var left = parseInt(style.left);
				var w = domElement.offsetWidth;
				style.left = (left - w / 2) + 'px';
			}
		});	
	}
	
	//load JSON data.
	rgraph.loadJSON(json);
			
	 //Compute positions and plot
	 rgraph.refresh();
    
   
    //end
    
	/*
   
    
    //Global Options
    //Define a function that returns the selected duration
    function getDuration() {
        var sduration = document.getElementById('select-duration');
        var sdindex = sduration.selectedIndex;
        return parseInt(sduration.options[sdindex].text);
    }
    //Define a function that returns the selected fps
    function getFPS() {
        var fpstype = document.getElementById('select-fps');
        var fpsindex = fpstype.selectedIndex;
        return parseInt(fpstype.options[fpsindex].text);
    }
    //Define a function that returns whether you have to
    //hide labels during the animation or not.
    function hideLabels() {
        return document.getElementById('hide-labels').checked;
    }
    
    //init handlers
    //Add event handlers to the right column controls.
 
    //Remove Nodes
    var button = $jit.id('remove-nodes');
    button.onclick = function() {
        //get animation type.
        var stype = $jit.id('select-type-remove-nodes');
        var sindex = stype.selectedIndex;
        var type = stype.options[sindex].text;
        //get node ids to be removed.
        var n = rgraph.graph.getNode('236797_5');
        if(!n) return;
        var subnodes = n.getSubnodes(0);
        var map = [];
        for (var i = 0; i < subnodes.length; i++) {
            map.push(subnodes[i].id);
        }
        //perform node-removing animation.
        rgraph.op.removeNode(map.reverse(), {
            type: type,
            duration: getDuration(),
            fps: getFPS(),
            hideLabels:hideLabels()
        });
    };

    //Remove edges
    button = $jit.id('remove-edges');
    button.onclick = function() {
        //get animation type.
        var stype = $jit.id('select-type-remove-edges');
        var sindex = stype.selectedIndex;
        var type = stype.options[sindex].text;
        //perform edge removing animation.
        rgraph.op.removeEdge([['236585_30', "190_0"], ['236585_30', '4619_46']], {
            type: type,
            duration: getDuration(),
            fps: getFPS(),
            hideLabels: hideLabels()
        });
    };

    //Add a Graph (Sum)
    button = $jit.id('sum');
    button.onclick = function(){
        //get graph to add.
        var trueGraph = eval('(' + graph + ')');        
        //get animation type.
        var stype = $jit.id('select-type-sum');
        var sindex = stype.selectedIndex;
        var type = stype.options[sindex].text;
        //perform sum animation.
        rgraph.op.sum(trueGraph, {
            type: type,
            fps: getFPS(),
            duration: getDuration(),
            hideLabels: hideLabels(),
            onComplete: function(){
                Log.write("sum complete!");
            }
        });
    };

    //Morph
    button = $jit.id('morph');
    button.onclick = function(){
        //get graph to morph to.
        var trueGraph = eval('(' + graph + ')');        
        //get animation type.
        var stype = $jit.id('select-type-morph');
        var sindex = stype.selectedIndex;
        var type = stype.options[sindex].text;
        //perform morphing animation.
        rgraph.op.morph(trueGraph, {
            type: type,
            fps: getFPS(),
            duration: getDuration(),
            hideLabels: hideLabels(),
            onComplete: function(){
                Log.write("morph complete!");
            }
        });
    };
    //end
	
	*/
}