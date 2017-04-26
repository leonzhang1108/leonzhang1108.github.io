/**
 * Created by leon on 2016/10/9.
 */
function getImageData(image){
    var ctx = document.getElementById('canvas').getContext('2d');
    var img = new Image();
    img.src = image.src;
    ctx.drawImage(img, 0, 0, 100, 100);
    var data = ctx.getImageData(0, 0, 200, 200).data;
    var points = []
    for (var i = 0, l = data.length; i &lt; l; i += 4) {
        var r = data[i];
        var g = data[i+1];
        var b = data[i+2];
        points.push([r, g, b]);
    }
    return points
}

function euclidean(p1, p2) {
    var s = 0;
    for (var i = 0, l = p1.length; i &lt; l; i++) {
        s += Math.pow(p1[i] - p2[i], 2)
    }
    return Math.sqrt(s);
}

function calculateCenter(points, n) {
    var vals = [];
    var plen = 0;
    for (var i = 0; i &lt; n; i++) { vals.push(0); }
    for (var i = 0, l = points.length; i &lt; l; i++) {
        plen++;
        for (var j = 0; j &lt; n; j++) {
            vals[j] += points[i][j];
        }
    }
    for (var i = 0; i &lt; n; i++) {
        if (plen &gt; 0){
            vals[i] = vals[i] / plen;
        }
    }
    return vals;
}

function kMeans(points, k, min_diff) {
    var plen = points.length;
    var clusters = [];
    var seen = [];
    while (clusters.length < k) {
        idx = parseInt(Math.random() * plen);
        var found = false;
        for (var i = 0; i < seen.length; i++ ) {
            if (idx === seen[i]) {
                found = true;
                break;
            }
        }
        if (!found) {
            seen.push(idx);
            clusters.push([points[idx], [points[idx]]]);
        }
    }

    while (true) {
        var plists = [];
        for (var i = 0; i < k; i++) {
            plists.push([]);
        }
        for (var j = 0; j < plen; j++) {
            var p = points[j];
            var smallest_distance = 10000000;
            var idx = 0;
            for (var i = 0; i < k; i++) {
                var distance = euclidean(p, clusters[i][0]);
                if (distance < smallest_distance) {
                    smallest_distance = distance;
                    idx = i;
                }
            }
            plists[idx].push(p);
        }
        var diff = 0;
        for (var i = 0; i < k; i++) {
            var old = clusters[i];
            var list = plists[i];
            var center = null;
            if (list.length > 0){
                center = calculateCenter(plists[i], 3);
            }else{
                center = calculateCenter(clusters, 3);
            }
            var new_cluster = [center, [center]];
            var dist = euclidean(old[0], center);
            clusters[i] = new_cluster;
            diff = diff > dist ? diff : dist;
        }
        if (diff < min_diff) {
            break;
        }
    }
    return clusters;
}