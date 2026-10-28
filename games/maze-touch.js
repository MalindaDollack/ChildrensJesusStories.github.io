/* Local, wall-respecting touch assistance for the original heart maze artwork. */
function gardenMazeMove(x, y) {
  var step = 4, limit = 110, origin = {x:pos.x,y:pos.y};
  var targetDistance = Math.hypot(x-origin.x,y-origin.y);
  if (targetDistance < 1) return;
  // Search only within a fingertip-sized area, never across the whole maze.
  var maxSteps = Math.min(38, Math.ceil(targetDistance/step)+12);
  var queue = [{x:origin.x,y:origin.y,ix:0,iy:0,parent:-1,depth:0}], seen = {'0,0':true};
  var best = 0, score = targetDistance, head = 0;
  var dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  while (head < queue.length) {
    var currentIndex = head++, q = queue[currentIndex];
    if (q.depth >= maxSteps) continue;
    for (var d = 0; d < dirs.length; d++) {
      var ix = q.ix+dirs[d][0], iy=q.iy+dirs[d][1], key=ix+','+iy;
      if (seen[key]) continue;
      seen[key]=true;
      var nx=origin.x+ix*step, ny=origin.y+iy*step;
      if(Math.hypot(nx-origin.x,ny-origin.y)>limit)continue;
      if(!valid(nx,ny)||!valid((q.x+nx)/2,(q.y+ny)/2))continue;
      var node={x:nx,y:ny,ix:ix,iy:iy,parent:currentIndex,depth:q.depth+1};
      var index=queue.push(node)-1;
      var candidate=Math.hypot(nx-x,ny-y)+node.depth*.12;
      if(candidate<score){score=candidate;best=index;}
    }
  }
  var moves=[];
  while(best>0){moves.push(queue[best]);best=queue[best].parent;}
  moves.reverse().forEach(function(p){
    if(won)return;
    var hit=-1;
    for(var j=path.length-3;j>=0;j--){
      if(Math.hypot(path[j].x-p.x,path[j].y-p.y)<6){hit=j;break;}
    }
    if(hit>=0)path.length=hit+1;
    pos={x:p.x,y:p.y};path.push({x:p.x,y:p.y});
    if(pos.x>635&&pos.x<692&&pos.y>1085)victory();
  });
}
