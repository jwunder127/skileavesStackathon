import React from 'react'


const possibleSaying = [
'It is certain',
'It is decidedly so',
'Without a doubt',
'Yes definitely',
'You may rely on it',
'As I see it, yes',
'Most likely',
'Outlook good',
'Yes',
'Signs point to yes']

const pickASaying = () => {
  const index = Math.floor(Math.random(0,1)*10)
  return possibleSaying[index]
}

const Sidebar = (props) => {

  const mountains = props.mountains
  const getScoreArray = props.getScoreArray
  const resetCenter = props.resetCenter

  const scoreArray = mountains && getScoreArray(mountains)
      .sort(function(a, b) {
          return b[1] - a[1]
        })

  return (
          <div >
            <nav id="sidebar-nav" className="navbar navbar-toggleable-md navbar-inverse bg-inverse navbar-static-top">
              <div id="navcontainer" className="container" >
                <img src="/skileaveslogo.svg"height="200" width="290" />

              </div>
              <p style={{textAlign: 'center', color: '#42e5f4'}}>{mountains ? `"${pickASaying()}..."`: ''}</p>
            </nav>
            <div id="sidebar">
              <h3 style={{textAlign: 'center'}}> Top Powder Destinations </h3>
              <ul className="nav list-group">
               {scoreArray && scoreArray.map(([mtn, score, website, lat, long], index) => (
                <li key={index}>
                  <a className= "list-group-item" href="#" onClick={() => resetCenter(lat, long)} >
                    <i className="icon-home icon-1x" />
                      <div>
                        <strong>
                          {index + 1}. <a href={website}>{mtn}</a>
                        </strong>
                      </div>
                      <div>
                         ski-leaves powder prediction index: <span style={{color: props.getColor(score)}}>{score}</span>
                      </div>
                  </a>
                </li>))}
            </ul>

            </div>
          </div>)
}

export default Sidebar
