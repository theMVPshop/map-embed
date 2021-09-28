/**
 *  Component to list the results of the search for a dental clinic
 *  This has two inner components: ClinicList and Map
 *  ClinicList: The actual list of returned dental offices
 *  Map: Display the location of the selected dental office on a map
 */

import React, { useEffect, useState } from 'react'
import "../../css/clinicSearchResults.css"
import Map from './Map'
import ClinicList from './ClinicList'
import { useHistory } from 'react-router'
import dentalImg from '../../images/Dental-image.png';

const ClinicSearchResults = ({clinicSearch}) => {
    // state and screen width to conditionally render map based on screen size
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const mapBreakpoint = 750;

    const queryString = window.location.search
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    const zip = urlParams.get('zip')

    // The list of results from the fetch call to the API
    const [clinicList, setClinicList] = useState([])

    // Track the clinic selected by the user
    const [selectedOffice, setSelectedOffice] = useState({})

    // Switch to show if anything found from the fetch call for conditional render in component
    const [resultsFound, setResultsFound] = useState(true);

    // To help with returning to the search page if no results found
    const history = useHistory();

    // Perform fetch call to search for clinics based on parameter from the search page,
    // set the results into ClinicList state and a default office to display on the map
   
    useEffect(() => {
        let url = ''
        
            if (/^[0-9,-]+$/.test(zip)) {
                url = `https://dentalapi.herokuapp.com/offices/zip/${zip}`
            } else {
                url = `https://dentalapi.herokuapp.com/offices/city/${zip}`
            }

            fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data.length > 0) {
                    setClinicList(data)
                        
                        for (let i = 0; i < data.length && i < 20; i++) {
                            // console.log(data[i])
                        setSelectedOffice(data[i])
                        
                    }
                        sessionStorage.setItem('clinicList', JSON.stringify(data))
                    } else {
                        setResultsFound(false)
                    }
                })
        }, [])

    useEffect(() => {
        window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
    }, []);

    // Pass store the selected office in state to pass to the Map Component
    const handleClick = (e) => {
        console.log(e)
        let id = e.target.id
        let office = clinicList[id]
        setSelectedOffice(office)
    }

    const newSearch = () => {
        sessionStorage.clear();
        history.push('/');
    };

    return (
        <div className='main-container'>
            <div className='list-area'>
                <div className="control">
                    <h2 className="control-title">Dental Offices</h2>
                    <button
                        className="control-btn"
                        type="button"
                        onClick={newSearch}>
                            New Search
                        </button>
                </div>
                <div className="list">
                    <div className="list-group">
                        {/* If nothing found display message and button to return to search page */}
                        {!resultsFound &&
                            // <h3>Sorry, no dental clinics found....</h3>
                            <div className='noresults-searching-container'>
                                <img src={dentalImg} alt='dentist illustration' className='noresults-searching-img'/> 
                                <h3>Sorry, no dental clinics found....</h3>
                            </div>
                        }
            </div>
                    {/* If results found, display searching message till results are returned */}
                    {resultsFound && clinicList.length > 0 ?
                            clinicList.map((clinic, index) => {
                                return (
                                    <ClinicList
                                        clinic={clinic}
                                        handleClick={handleClick}
                                        key={index}
                                        index={index}
                                    />
                            )
                        }) 
                        : resultsFound && <h3>Searching.....</h3>                           
                    }
                </div>
            </div>
            {/* Don't display map untill ClinicList is loaded with data */}
            {resultsFound && windowWidth > mapBreakpoint ? <div className='map-area'>
                <h2>Dental Office Map</h2>
                {clinicList.length > 0 && <Map selectedOffice={selectedOffice} />}
            </div> : ''
            }
        </div>
    )
}

export default ClinicSearchResults