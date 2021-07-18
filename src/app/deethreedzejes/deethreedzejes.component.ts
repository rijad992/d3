import { AfterContentInit, Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

const dataDown = {
  name: 'flare',
  children: [
    {
      name: 'analytics',
      children: [
        {
          name: 'analytics',
          children: [
            {
              name: 'analytics',
              children: [
                {
                  name: 'analytics',
                },
                {
                  name: 'analytics',
                },
              ],
            },
            {
              name: 'analytics',
            },
          ],
        },
        {
          name: 'analytics',
        },
      ],
    },
    {
      name: 'analytics',
      children: [
        {
          name: 'analytics',
          children: [
            {
              name: 'analytics',
            },
            {
              name: 'analytics',
            },
          ],
        },
        {
          name: 'analytics',
        },
      ],
    },
  ],
};

const dataUp = {
  name: 'up',
  direction: 'up',
  children: [
    {
      name: 'up',
      direction: 'up',
      children: [
        {
          name: 'up',
          direction: 'up',
          children: [
            {
              name: 'up',
              direction: 'up',
            },
            {
              name: 'up',
              direction: 'up',
            },
          ],
        },
        {
          name: 'up',
          direction: 'up',
        },
      ],
    },
    {
      name: 'up',
      direction: 'up',
      children: [
        {
          name: 'up',
          direction: 'up',
        },
        {
          name: 'up',
          direction: 'up',
        },
      ],
    },
  ],
};

@Component({
  selector: 'app-deethreejs',
  templateUrl: './deethreedzejes.component.html',
  styleUrls: ['./deethreedzejes.component.scss'],
})
export class DeethreedzejesComponent implements AfterContentInit {
  constructor() {}

  ngAfterContentInit(): void {
    this.drawTree(dataDown, dataUp);
    //this.drawTree(dataUp)
    //console.log(svg.node().getBoundingClientRect())
  }
  //@ts-ignore
  onClick(d, i) {
    console.log({ d, i });
  }
  //@ts-ignore
  drawTree(down, up) {
    const hierarchy = d3.hierarchy(down);
    const hierarchyUp = d3.hierarchy(up);

    const tree = d3.tree();
    tree
      .separation((a, b) => {
        return a.parent == b.parent ? 5 : 10;
      })
      .nodeSize([10, 70]);
    const treeData = tree(hierarchy);
    const treeDataUp = tree(hierarchyUp);

    const link = d3
      .linkVertical()
      .source((d) => {
        return [(d as any)?.source?.x, (d as any)?.source?.y];
      })
      .target((d) => {
        return [(d as any).target.x, (d as any).target.y];
      });

    const svg = d3.select('svg.canvas');
    //@ts-ignore

    //get svg container width height
    const rootSvgSize = svg.node().getBoundingClientRect();

    const rootx = rootSvgSize.width / 2;
    const rooty = rootSvgSize.height / 2;

    const g = svg.append('g').attr('class', 'container-group');
    // .attr('transform', function (d) {
    //   return `translate(${rootx} ,${rooty} )`;
    // });

    const zoom = d3.zoom().on('zoom', (e) => {
      e.transform.x = e.transform.x === 0 ? rootx : e.transform.x;
      e.transform.y = e.transform.y === 0 ? rooty : e.transform.y;
      g.attr('transform', e.transform);
      //console.log('e', e.transform);

      //g.style('transform', `translate(${e.transform.x}px, ${e.transform.y}px)`)
      //console.log(`translate(${e.transform.x}px, ${e.transform.y}px)`, e);
    });
    //@ts-ignore
    svg.call(zoom);

    //svg.on('dblclck.zoom', null)
    //@ts-ignore
    g.call(zoom.transform, d3.zoomIdentity);

    const links = g
      .selectAll('.link')
      .data(treeData.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      //@ts-ignore
      .attr(
        'd',
        //@ts-ignore

        d3
          .linkVertical()
          .x((d) => {
            return (d as any)?.x;
          })
          .y((d) => {
            return (d as any)?.y;
          })
      );
    const linksUp = g
      .selectAll('.link-up')
      .data(treeDataUp.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      //@ts-ignore
      .attr(
        'd',
        //@ts-ignore

        d3
          .linkVertical()
          .x((d) => {
            return (d as any)?.x;
          })
          .y((d) => {
            return -(d as any)?.y;
          })
      );
    var node = g
      .selectAll('.node')
      .data(treeData.descendants())
      .enter()
      .append('g')
      .attr('class', function (d) {
        return 'node' + (d.children ? ' node--internal' : ' node--leaf');
      })
      .style('transform', function (d) {
        //console.log(d);
        return 'translate(' + d.x + 'px ,' + d.y + 'px )';
      })
      .on('click', this.onClick);

    // adds the circle to the node
    node.append('circle').attr('r', 10);

    // adds the text to the node
    node
      .append('text')
      .attr('dy', '.35em')
      .attr('y', function (d) {
        return d.children ? -20 : 20;
      })
      .style('text-anchor', 'middle')
      .text(function (d) {
        return (d as any).data.name;
      });

    //uppernodes code
    var nodeUp = g
      .selectAll('.node-up')
      .data(treeDataUp.descendants().slice(1))
      .enter()
      .append('g')
      .attr('class', function (d) {
        return 'node' + (d.children ? ' node--internal' : ' node--leaf');
      })
      .style('transform', function (d) {
        console.log(d);
        return 'translate(' + d.x + 'px ,' + -d.y + 'px )';
      })
      .on('click', this.onClick);

    // adds the circle to the node
    nodeUp.append('circle').attr('r', 10);

    // adds the text to the node
    nodeUp
      .append('text')
      .attr('dy', '.35em')
      .attr('y', function (d) {
        return d.children ? 20 : -20;
      })
      .style('text-anchor', 'middle')
      .text(function (d) {
        return (d as any).data.name;
      });
  }
}
