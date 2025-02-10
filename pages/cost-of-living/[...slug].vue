<template>
    <div>
        <div class="CocMainBanner">
            <div class="maincomboBanner">
                <div class="bannerTitleBox">
                    <h1 class="cocBannerTitle">{{ newCityState }} Cost of Living Calculator</h1>
                </div>
                <div class="imageSection">
                    <img :loading="isMobile ? 'lazy' : ''" src="https://dtpwvruv8ddnl.cloudfront.net/images/cost-of-living/coc-banner.webp" alt="banner" class="cocBannerImage" />
                    <img :loading="isMobile ? '' : 'lazy'" src="https://dtpwvruv8ddnl.cloudfront.net/images/cost-of-living/coc-banner-mobile.webp" alt="banner" class="cocBannerMobImage" />
                </div>
            </div>
            <div class="CocWrapper CocBannerSection">
                <div class="compareSec">
                    <p class="compareDesc">Compare Cost of Living</p>
                    <div class="compareList">
                        <div class="inputBlock">
                            <span ref="curLocIcon" class="icon">
                                <img src="https://dtpwvruv8ddnl.cloudfront.net/images/cost-of-living/coc-map-marker.svg" alt="map-marker" />
                            </span>
                            <div class="inputBoxElement">
                                <input @focus="handleOnFocus('curLocIcon')" @blur="currentLocation.length === 0 ? $refs.curLocIcon.classList.remove('activeIcon') : null" type="text" placeholder=" " v-model="currentLocation" id="currentLocation" class="location form-control" required="" />
                                <label class="labelTag" for="currentLocation">Current Location</label>
                            </div>
                        </div>
                        <div class="inputBlock">
                            <span ref="newLocIcon" class="icon map-icon activeIcon">
                                <img src="https://dtpwvruv8ddnl.cloudfront.net/images/cost-of-living/coc-map-marker.svg" alt="map-marker" />
                            </span>

                            <div class="inputBoxElement inputLocation">
                                <input @focus="handleOnFocus('newLocIcon')" @blur="newLocation.length === 0 ? $refs.newLocIcon.classList.remove('activeIcon') : null" type="text" placeholder=" " v-model="newLocation" id="newLocation" class="location form-control" required="" />
                                <label class="labelTag" for="newLocation">New Location</label>
                            </div>
                            <span class="coc-form-err" id="newLocErr"></span>
                        </div>
                        <div class="inputBlock">
                            <span ref="dollarIcon" class="icon">
                                <img src="https://dtpwvruv8ddnl.cloudfront.net/images/cost-of-living/coc-dollar.svg" alt="map-marker" />
                            </span>

                            <div class="inputBoxElement">
                                <input @focus="$refs.dollarIcon.classList.add('activeIcon')" @blur="preTaxIncome.length === 0 ? $refs.dollarIcon.classList.remove('activeIcon') : null" maxlength="10" v-model="preTaxIncome" @input="onInputPreTaxIncome" type="text" placeholder=" " name="yourIncome" id="yourIncome" class="income form-control" required="" />
                                <label class="labelTag" for="yourIncome">Your Pre-Tax Income</label>
                            </div>
                            <span class="taxIncomeErr"></span>
                        </div>
                    </div>
                    <p id="form-err" :style="{ display: isMobile ? 'block' : 'none' }" class="coc-form-err"></p>
                    <span class="currentLocationErr"></span>
                    <form @submit.prevent="handleFormSubmit">
                        <div class="compareBtn">
                            <button type="submit" :class="['compareCostBtn', { loading_btn: newLocationLoad || curLocationLoad || isSearchSectionLoad }]">
                                Compare <span class="costSec"> Cost </span>
                                <span class="cocArrowBox">
                                    <span class="cocArrow arrowFirst">
                                        <img src="https://dtpwvruv8ddnl.cloudfront.net/images/cost-of-living/coc-white-arrow2.svg" alt="arrrow" />
                                    </span>
                                    <span class="cocArrow arrowSec">
                                        <img src="https://dtpwvruv8ddnl.cloudfront.net/images/cost-of-living/coc-white-arrow2.svg" alt="arrrow" />
                                    </span>
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="CocWrapper">
            <div class="CocSectionWrapper CocLivingScore">
                <h2 class="cocTitle">Cost of Living Score in {{ newCityState }}</h2>
                <p class="cocDesc">
                    The living expenses in {{ newCityState }} are
                    <span :class="overallComparisonPercent > 0 ? 'CocRed' : 'CocGreen'">
                        {{ Math.abs(overallComparisonPercent) + "%" }}
                        {{ overallComparisonPercent >= 0 ? "higher" : "lower" }}
                    </span>
                    {{ dropDown === "U.S. Avg" ? "than the" : "than" }}
                    {{ dropDown }}.
                </p>
                <div class="cocCostList">
                    <div class="cocTopCost">
                        <span class="cocTopLeftText">Major Costs</span>
                        <span class="cocTopRightText">
                            <label for="avgCompare" class="cocCompareWithText"> Compared with:</label>
                            <div class="cocSelectBox">
                                <select onfocus="this.size=6; this.style.width = (this.getBoundingClientRect().width - 0.945) + 'px';" onblur="this.size=1; this.style.width = '';" onchange="this.size=1; this.blur();" v-model="dropDown" @change="handleDropDownChange" class="averageSelect" name="average" id="avgCompare">
                                    <option v-for="(item, index) in comparedWithOptions" :key="index" :value="item">{{ item }}</option>
                                </select>
                            </div>
                        </span>
                    </div>
                    <div class="cocMainMiddleLis">
                        <div class="CocMiddleList" ref="cocMiddleList">
                            <div class="CoCMidCard" ref="card1" @mouseover="onMouseOver" @mouseout="onMouseOut">
                                <div class="cocLeftCard">
                                    <span class="buyCard">
                                        <img loading="lazy" src="https://dtpwvruv8ddnl.cloudfront.net/images/cost-of-living/buy-house.svg" alt="cardImage" />
                                    </span>
                                    <span class="cocContent">Buying a House</span>
                                </div>
                                <div class="cocRightCard">
                                    <span class="cocDollar">${{ Math.round(newLocData["buying_house"]).toLocaleString() }}</span>
                                    <!-- <span class="cocDollar">{{ displayValue(counter1, 100) }}</span> -->
                                    <span class="cocGraph">
                                        <span class="graphImg"> <img loading="lazy" :src="selectGraphColor('buying_house').img" alt="graph" /> </span> <span :class="selectGraphColor('buying_house').color"> {{ Math.abs(displayValue(counter1, 100)) }}%</span> than {{ dropDown }}
                                    </span>
                                </div>
                            </div>
                            <div class="CoCMidCard" ref="card2" @mouseover="onMouseOver" @mouseout="onMouseOut">
                                <div class="cocLeftCard">
                                    <span class="buyCard">
                                        <img loading="lazy" src="https://dtpwvruv8ddnl.cloudfront.net/images/cost-of-living/rent-house.svg" alt="cardImage" />
                                    </span>
                                    <span class="cocContent">Renting a House</span>
                                </div>
                                <div class="cocRightCard">
                                    <span class="cocDollar">${{ Math.round(newLocData["renting_house"]).toLocaleString() }}</span>
                                    <span class="cocGraph">
                                        <span class="graphImg"> <img loading="lazy" :src="selectGraphColor('renting_house').img" alt="graph" /> </span> <span :class="selectGraphColor('renting_house').color"> {{ Math.abs(displayValue(counter2, 100)) }}%</span> than {{ dropDown }}
                                    </span>
                                </div>
                            </div>

                            <div class="CoCMidCard" ref="card3" @mouseover="onMouseOver" @mouseout="onMouseOut">
                                <div class="cocLeftCard">
                                    <span class="buyCard">
                                        <img loading="lazy" src="https://dtpwvruv8ddnl.cloudfront.net/images/cost-of-living/utilities.svg" alt="cardImage" />
                                    </span>
                                    <span class="cocContent">Utilities</span>
                                </div>
                                <div class="cocRightCard">
                                    <span class="cocDollar">${{ Math.round(newLocData["utilities"]).toLocaleString() }}</span>
                                    <span class="cocGraph">
                                        <span class="graphImg"> <img loading="lazy" :src="selectGraphColor('utilities').img" alt="graph" /> </span> <span :class="selectGraphColor('utilities').color"> {{ Math.abs(displayValue(counter3, 100)) }}%</span> than {{ dropDown }}
                                    </span>
                                </div>
                            </div>

                            <div class="CoCMidCard" ref="card4" @mouseover="onMouseOver" @mouseout="onMouseOut">
                                <div class="cocLeftCard">
                                    <span class="buyCard">
                                        <img loading="lazy" src="https://dtpwvruv8ddnl.cloudfront.net/images/cost-of-living/food-grocery.svg" alt="cardImage" />
                                    </span>
                                    <span class="cocContent">Food & Groceries</span>
                                </div>
                                <div class="cocRightCard">
                                    <span class="cocDollar">${{ Math.round(newLocData["food_n_groceries"]).toLocaleString() }}</span>
                                    <span class="cocGraph">
                                        <span class="graphImg"> <img loading="lazy" :src="selectGraphColor('food_n_groceries').img" alt="graph" /> </span> <span :class="selectGraphColor('food_n_groceries').color"> {{ Math.abs(displayValue(counter4, 100)) }}%</span> than {{ dropDown }}
                                    </span>
                                </div>
                            </div>

                            <div class="CoCMidCard" ref="card5" @mouseover="onMouseOver" @mouseout="onMouseOut">
                                <div class="cocLeftCard">
                                    <span class="buyCard">
                                        <img loading="lazy" src="https://dtpwvruv8ddnl.cloudfront.net/images/cost-of-living/coc-hospital.svg" alt="cardImage" />
                                    </span>
                                    <span class="cocContent">Healthcare</span>
                                </div>
                                <div class="cocRightCard">
                                    <span class="cocDollar">${{ Math.round(newLocData["healthcare"]).toLocaleString() }}</span>
                                    <span class="cocGraph">
                                        <span class="graphImg"> <img loading="lazy" :src="selectGraphColor('healthcare').img" alt="graph" /> </span> <span :class="selectGraphColor('healthcare').color"> {{ Math.abs(displayValue(counter5, 100)) }}%</span> than {{ dropDown }}
                                    </span>
                                </div>
                            </div>

                            <div class="CoCMidCard" ref="card6" @mouseover="onMouseOver" @mouseout="onMouseOut">
                                <div class="cocLeftCard">
                                    <span class="buyCard">
                                        <img loading="lazy" src="https://dtpwvruv8ddnl.cloudfront.net/images/cost-of-living/transport.svg" alt="cardImage" />
                                    </span>
                                    <span class="cocContent">Transportation</span>
                                </div>
                                <div class="cocRightCard">
                                    <span class="cocDollar">${{ Math.round(newLocData["transportation"]).toLocaleString() }}</span>
                                    <span class="cocGraph">
                                        <span class="graphImg"> <img loading="lazy" :src="selectGraphColor('transportation').img" alt="graph" /> </span> <span :class="selectGraphColor('transportation').color"> {{ Math.abs(displayValue(counter6, 100)) }}%</span> than {{ dropDown }}
                                    </span>
                                </div>
                            </div>

                            <div class="CoCMidCard" ref="card7" @mouseover="onMouseOver" @mouseout="onMouseOut">
                                <div class="cocLeftCard">
                                    <span class="buyCard">
                                        <img loading="lazy" src="https://dtpwvruv8ddnl.cloudfront.net/images/cost-of-living/miscellaneous.svg" alt="cardImage" />
                                    </span>
                                    <span class="cocContent">Miscellaneous</span>
                                </div>
                                <div class="cocRightCard">
                                    <span class="cocDollar">${{ Math.round(newLocData["miscellaneous"]).toLocaleString() }}</span>
                                    <span class="cocGraph">
                                        <span class="graphImg"> <img loading="lazy" :src="selectGraphColor('miscellaneous').img" alt="graph" /> </span> <span :class="selectGraphColor('miscellaneous').color">{{ Math.abs(displayValue(counter7, 100)) }}%</span> than {{ dropDown }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div v-show="propertiesCount || isFetchingHome" class="card-loader">
                            <a target="_blank" :href="hfsLink" class="CoCMidCard cocMidDiffCard" ref="card8" @mouseover="onMouseOver" @mouseout="onMouseOut">
                                <div v-show="isFetchingHome" class="cocLoaderBox">
                                    <div class="loaderBox cocTitleLoader2">
                                        <div class="card-loader"></div>
                                    </div>
                                </div>
                                <span class="cocMidHovText"
                                    >View <span class="cocDiffNumb"> {{ commaFormatting(propertiesCount) }} </span> homes for sale in {{ newCityState }}</span
                                >
                                <span class="cocArrowBox">
                                    <span class="cocArrow arrowFirst">
                                        <img loading="lazy" src="https://dtpwvruv8ddnl.cloudfront.net/images/cost-of-living/coc-arrow2.svg" alt="arrrow" />
                                    </span>
                                    <span class="cocArrow arrowSec">
                                        <img loading="lazy" src="https://dtpwvruv8ddnl.cloudfront.net/images/cost-of-living/coc-arrow2.svg" alt="arrrow" />
                                    </span>
                                </span>
                            </a>
                        </div>
                        <div class="borderDiv"></div>
                    </div>
                </div>
            </div>

            <div v-show="showBarChart" class="CocSectionWrapper CocFlCities">
                <h2 class="cocTitle">Comparison Between Top {{ stateName }} Cities</h2>
                <p class="cocDesc">Here's a graphical representation of the cost of living between {{ newCityState }} {{ cityCount }} largest cities compared to the national average.</p>
                <div class="chartBox">
                    <div class="cocChartContainer" ref="chartContainer">
                        <canvas id="myBarChart" :height="updateBarGraphSize"></canvas>
                    </div>
                </div>
            </div>

            <div class="CocSectionWrapper cocCostCalcText">
                <h2 class="cocTitle">What is a Cost of Living Calculator?</h2>
                <p class="cocDesc">
                    Find out how living costs in Florida vary across locations with our cost-of-living calculator. This calculator will help you in comparing everyday expenses like housing, groceries, transportation, and healthcare in different cities or regions.
                    <span class="readTextblock" :class="{ active: isActive }">
                        <span class="readText readMore" @click="toggleReadMore">Read More</span>
                    </span>
                </p>
                <transition name="fade">
                    <div v-if="isMobile" class="readDesc" v-show="isDescVisible" :class="{ active: isActive }">
                        <p class="cocDesc">We consider common living expenses like average water bill, average rent in Florida, average electricity bill, etc. to create our cost-of-living data.<span class="readText readLess" @click="toggleReadMore">Read less</span></p>
                    </div>
                </transition>
                <div class="readDesc readDeskBlock" v-show="isDescVisible">
                    <p class="cocDesc">We consider common living expenses like average water bill, average rent in Florida, average electricity bill, etc. to create our cost-of-living data.</p>
                </div>
            </div>

            <div class="CocSectionWrapper cocSal">
                <p class="cocDesc cocExpLink" v-if="isCityPassed">Explore all homes for sale in {{ `${cityName}, ${stateName} ` }}</p>
                <p class="cocDesc cocExpLink" v-else>Explore all homes for sale in {{ stateName }}</p>
                <div class="cocSecBox">
                    <a :href="`${baseUrl}`" class="cocSecLink">Home</a>
                    <span class="angle_left"> > </span>
                    <a :href="`${baseUrl}/homes-for-sale`" class="cocSecLink">Homes For Sale</a>
                    <span class="angle_left"> ></span>
                    <template v-if="isCityPassed">
                        <a :href="`${baseUrl}/homes-for-sale/${urlFriendlyString(stateName)}`" class="cocSecLink"> {{ stateName }}</a>
                        <span class="angle_left"> ></span>
                        <a :href="`${baseUrl}/homes-for-sale/${urlFriendlyString(stateName)}/${urlFriendlyString(cityName)}`" class="cocSecLink"> {{ cityName }}</a>
                    </template>
                    <template v-else>
                        <a :href="`${baseUrl}/homes-for-sale/${urlFriendlyString(stateName)}`" class="cocSecLink"> {{ stateName }}</a>
                    </template>
                </div>

                <p class="cocDesc cocLegal">
                    *Legal Disclosure: Houzeo Mortgage Calculator is to be used only to get an estimate of your monthly payment. Actual rates change depending on multiple factors, including your exact location and the loan type. These estimates are based on the inputs you provide and may not include additional costs that the lender may incur to originate the mortgage. Houzeo doesn't generate loans
                    and is not committed to lending you any money.
                </p>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
import $ from 'jquery';

export default {
    name: "BarChart",
    setup() {
        definePageMeta({
            middleware: 'validate-route'
        });
        const stateName = useState('stateName');

        return {
            stateName
        }
    },
    data() {
        return {
            defaultData: null,
            backend_url: import.meta.env.VITE_BACKEND_URL,
            isMapsScriptLoaded: false,
            isFaqInView: false,
            newLocationLoad: false,
            curLocationLoad: false,
            availableCities: ["Miami","Miami Beach","Miami Gardens","Miami Lakes","North Miami","South Miami","West Miami","Aventura","Coral Gables","Doral","Florida City","Hialeah","Hialeah Gardens","Homestead","Opa-locka","Sunny Isles Beach","Sweetwater","North Miami Beach","Cutler Bay","Medley","Miami Springs","North Bay Village","Bay Harbor Islands","Miami Shores","Surfside","Bal Harbour","Biscayne Park","El Portal","Golden Beach","Indian Creek","Key Biscayne","Palmetto Bay","Pinecrest","Virginia Gardens","Brownsville","Country Club","Kendall","Kendale Lakes","Leisure City","Naranja","Olympia Heights","Palm Springs North","Pinewood","Princeton","Richmond Heights","South Miami Heights","Sunset","Tamiami","The Crossings","The Hammocks","Three Lakes","University Park","West Kendall","West Perrine","Westchester","Apopka","Bay Lake","Belle Isle","Edgewood","Lake Buena Vista","Maitland","Ocoee","Orlando","Winter Garden","Winter Park","Eatonville","Windermere","Oakland","Alafaya","Azalea Park","Bay Hill","Christmas","Clarcona","Conway","Doctor Phillips","Fairview Shores","Four Corners","Goldenrod","Gotha","Holden Heights","Horizon West","Hunters Creek","Lake Butler","Lake Mary Jane","Lockhart","Meadow Woods","Oak Ridge","Paradise Heights","Pine Castle","Pine Hills","Rio Pinar","Sky Lake","South Apopka","Southchase","Taft","Tangelo Park","Tildenville","Union Park","Wedgefield","Williamsburg","Zellwood","Tampa","Plant City","Temple Terrace","Apollo Beach","Balm","Brandon","Carrollwood","Cheval","Citrus Park","Dover","East Lake Orient Park","Gibsonton","Keystone","Lithia","Lutz","Mango","Odessa","Palm River Clair Mel","Riverview","Ruskin","Seffner","Sun City","Sun City Center","Thonotosassa","Town 'n' Country","Valrico","Wimauma","Coconut Creek","Cooper City","Coral Springs","Dania Beach","Davie","Deerfield Beach","Fort Lauderdale","Hallandale Beach","Hollywood","Lauderdale Lakes","Lauderdale By The Sea","Lauderhill","Lighthouse Point","Margate","Miramar","North Lauderdale","Oakland Park","Parkland","Pembroke Pines","Plantation","Pompano Beach","Sea Ranch Lakes","Southwest Ranches","Sunrise","Tamarac","West Park","Weston","Wilton Manors","Sea Ranch Lakes","Broadview Park","Hillsboro Beach","Lazy Lake","Roosevelt Gardens","Washington Park","Anchorage","Fairbanks","Juneau","Kodiak","Anniston-Calhoun County","Auburn-Opelika","Birmingham","Decatur-Hartselle","Dothan","Florence","Huntsville","Mobile","Montgomery","Tuscaloosa","Bentonville","Conway","Fayetteville","Hot Springs","Jonesboro","Little Rock-N Little Rock","Bullhead City","Flagstaff","Gilbert","Lake Havasu City","Phoenix","Prescott-Prescott Valley","Scottsdale","Sierra Vista","Surprise","Tucson","Yuma","Bakersfield","Fresno","Los Angeles-Long Beach","Modesto","Oakland","Orange County","Palm Springs","Redding","Riverside City","Sacramento","San Diego","San Francisco","San Jose","Stockton","Sunnyvale","Tracy","Truckee-Nevada County","Colorado Springs","Denver","Glenwood Springs","Grand Junction","Gunnison","Pueblo","Westminster","Hartford","New Haven","Stamford","Washington-Arlington-Alexandria","Dover","Sussex County","Wilmington","Bradenton","Cape Coral-Fort Myers","Daytona Beach","Fort Lauderdale","Gainesville","Jacksonville","Miami-Dade County","Ocala","Orlando","Palm Coast-Flagler County","Pensacola","Punta Gorda-Charlotte Co","Sarasota","Tallahassee","Tampa","Vero Beach-Indian River","Albany","Athens","Atlanta","Columbus","Dalton","Douglasville - Douglas County","Dublin-Laurens County","Fayetteville-Fayette County","LaGrange-Troup County","Macon","Marietta","Savannah","Statesboro-Bulloch County","Valdosta","Augusta-Aiken","Hilo","Honolulu","Ames","Burlington","Cedar Rapids","Des Moines","Dubuque","Iowa City","Mason City","Sioux City","Waterloo-Cedar Falls","Davenport-Moline-Rock Is","Boise","Idaho Falls","Twin Falls","Bloomington-Normal","Carbondale","Champaign-Urbana","Chicago","Danville","Decatur","Galesburg","Joliet-Will County","Kankakee","Peoria","Quincy","Rockford","Springfield","Bloomington","Elkhart-Goshen","Evansville","Fort Wayne-Allen County","Indianapolis","Indianapolis-Morgan County","Kokomo","Lafayette","Muncie","Richmond","South Bend","Terre Haute","Dodge City","Hutchinson","Manhattan","Pittsburg","Salina","Topeka","Wichita","Ashland","Bowling Green","Covington","Lexington","Louisville","Paducah","Alexandria","Baton Rouge","Hammond","Houma-Terrebonne Parish","Lafayette","Lake Charles","Monroe","New Orleans","Shreveport-Bossier City","Slidell-St. Tammany Parish","Thibodaux-Lafourche Parish","Boston","Fitchburg-Leominster","Framingham-Natick","Pittsfield","Baltimore","Bethesda-Gaithersburg-Frederick","Charles County","Portland","Ann Arbor","Benton Harbor","Detroit","Flint-Genesee County","Grand Rapids","Kalamazoo","Lansing","Troy","Mankato","Minneapolis","Rochester","St. Cloud","St. Paul","Cape Girardeau","Columbia","Jefferson City","Joplin","Springfield","St. Charles County","St. Joseph","St. Louis","Kansas City","Gulfport-Biloxi","Hattiesburg","Jackson","Meridian","Tupelo","Billings","Bozeman","Great Falls","Kalispell","Missoula","Asheville","Burlington","Chapel Hill","Charlotte","Dare County","Durham","Fayetteville","Greenville","Hickory","Jacksonville","Lexington-Thomasville","Marion-McDowell County","Raleigh","Salisbury","Wilmington","Winston-Salem","Bismarck-Mandan","Grand Forks","Minot","Fargo-Moorhead","Hastings","Lincoln","Omaha","Manchester","Bergen-Passaic","Middlesex-Monmouth","Morristown","Newark-Elizabeth","Vineland","Albuquerque","Carlsbad","Las Cruces","Los Alamos","Rio Rancho","Las Vegas","Reno-Sparks","Albany","Buffalo","Dutchess County","Herkimer County","Ithaca","Nassau County","New York (Brooklyn)","New York (Manhattan)","New York (Queens)","Otsego County","Rochester","Syracuse","Utica-Rome","Akron","Ashland","Cincinnati","Cleveland","Columbus","Dayton","Findlay","Lima","Toledo","Wayne County","Wooster","Youngstown-Warren","Ardmore","Broken Arrow","Edmond","Enid","Lawton","McAlester","Muskogee","Norman","Oklahoma City","Ponca City","Pryor Creek","Stillwater","Tulsa","Eugene","Klamath Falls","Portland","Allentown","Erie","Harrisburg","Indiana County","Johnstown","Philadelphia","Pittsburgh","Reading","Scranton","Wayne County","Wilkes-Barre","Williamsport-Lycoming Co","York County","San Juan","Providence","Anderson","Beaufort","Camden","Charleston-N Charleston","Columbia","Greenville","Hilton Head Island","Myrtle Beach","Spartanburg","Sumter","Pierre","Rapid City","Sioux Falls","Chattanooga","Clarksville","Cleveland","Columbia-Maury County","Cookeville","Dyersburg","Jackson-Madison County","Johnson City","Kingsport","Knoxville","Memphis","Morristown","Murfreesboro-Smyrna","Nashville-Franklin","Abilene","Allen","Amarillo","Arlington","Athens/Henderson County","Austin","Beaumont","Brazoria County","Brownsville","Cedar Park","Conroe","Corpus Christi","Dallas","Denton","El Paso","Fort Worth","Harlingen","Houston","Longview","Lubbock","Lufkin","McAllen","McKinney","Midland","Nacogdoches","Odessa","Paris","Plano","Round Rock","San Angelo","San Antonio","San Marcos","Seguin","Sherman-Denison","Temple","Tyler","Waco","Weatherford","Wichita Falls","Texarkana","USA AVERAGE","Cedar City","Ogden","Provo-Orem","Salt Lake City","St. George","Alexandria","Arlington","Blacksburg","Charlottesville","Danville City","Hampton Roads-SE Virginia","Harrisonburg","Lexington-Buena Vista-Rockbridge","Lynchburg","Martinsville-Henry County","Richmond","Roanoke","Staunton-Augusta County","Winchester","Burlington-Chittenden Co","Bellingham","Everett","Kent","Kitsap County","Moses Lake","Mount Vernon-Skagit County","Olympia","Richland-Kennewick-Pasco","Seattle","Spokane","Tacoma","Vancouver","Wenatchee","Yakima","Eau Claire","Fond du Lac","Green Bay","Janesville","Madison","Marshfield","Milwaukee-Waukesha","Wausau","Charleston","Clarksburg","Martinsburg-Berkeley County","Morgantown","Casper","Cheyenne","Laramie"],
            topCities: ["Atlanta", "Austin", "Charlotte", "Dallas", "Denver", "Houston", "Los Angeles", "Orlando", "Phoenix", "Raleigh", "Sacramento", "San Antonio", "San Diego", "San Francisco", "Seattle", "Tampa"],
            topCitiesData: [{"city_name":"Phoenix","state_name":"AZ","composite_index":104.1,"buying_house":555932,"renting_house":1890,"utilities":396,"food_n_groceries":124,"healthcare":592,"transportation":63,"miscellaneous":441},{"city_name":"Los Angeles-Long Beach","state_name":"CA","composite_index":150.2,"buying_house":1261292,"renting_house":3082,"utilities":424,"food_n_groceries":131,"healthcare":669,"transportation":71,"miscellaneous":544},{"city_name":"Sacramento","state_name":"CA","composite_index":124.8,"buying_house":690165,"renting_house":2277,"utilities":531,"food_n_groceries":126,"healthcare":676,"transportation":75,"miscellaneous":490},{"city_name":"San Diego","state_name":"CA","composite_index":144.2,"buying_house":1094896,"renting_house":3138,"utilities":453,"food_n_groceries":132,"healthcare":672,"transportation":72,"miscellaneous":503},{"city_name":"San Francisco","state_name":"CA","composite_index":170.3,"buying_house":1400091,"renting_house":3788,"utilities":551,"food_n_groceries":139,"healthcare":775,"transportation":81,"miscellaneous":544},{"city_name":"Denver","state_name":"CO","composite_index":109.1,"buying_house":651950,"renting_house":1877,"utilities":352,"food_n_groceries":124,"healthcare":616,"transportation":63,"miscellaneous":481},{"city_name":"Orlando","state_name":"FL","composite_index":98.5,"buying_house":466412,"renting_house":1819,"utilities":385,"food_n_groceries":121,"healthcare":594,"transportation":58,"miscellaneous":450},{"city_name":"Tampa","state_name":"FL","composite_index":96.7,"buying_house":446875,"renting_house":1760,"utilities":392,"food_n_groceries":122,"healthcare":560,"transportation":68,"miscellaneous":406},{"city_name":"Atlanta","state_name":"GA","composite_index":97.2,"buying_house":457178,"renting_house":1501,"utilities":360,"food_n_groceries":122,"healthcare":666,"transportation":70,"miscellaneous":450},{"city_name":"Charlotte","state_name":"NC","composite_index":97.7,"buying_house":409350,"renting_house":1512,"utilities":375,"food_n_groceries":121,"healthcare":649,"transportation":60,"miscellaneous":497},{"city_name":"Raleigh","state_name":"NC","composite_index":98.1,"buying_house":457535,"renting_house":1599,"utilities":371,"food_n_groceries":122,"healthcare":654,"transportation":53,"miscellaneous":467},{"city_name":"Austin","state_name":"TX","composite_index":98.1,"buying_house":509301,"renting_house":1856,"utilities":383,"food_n_groceries":117,"healthcare":628,"transportation":62,"miscellaneous":446},{"city_name":"Dallas","state_name":"TX","composite_index":102.3,"buying_house":481052,"renting_house":1582,"utilities":435,"food_n_groceries":118,"healthcare":677,"transportation":56,"miscellaneous":531},{"city_name":"Houston","state_name":"TX","composite_index":94.3,"buying_house":393113,"renting_house":1331,"utilities":392,"food_n_groceries":120,"healthcare":626,"transportation":65,"miscellaneous":500},{"city_name":"San Antonio","state_name":"TX","composite_index":91.1,"buying_house":348180,"renting_house":1503,"utilities":340,"food_n_groceries":115,"healthcare":667,"transportation":68,"miscellaneous":465},{"city_name":"Seattle","state_name":"WA","composite_index":146,"buying_house":1058860,"renting_house":3290,"utilities":402,"food_n_groceries":133,"healthcare":832,"transportation":71,"miscellaneous":585}],
            listingDataJSON: {},
            qlTabVal: "0",
            isFetchingHome: true,
            curLocChanged: false,
            stateAverage: null,
            baseUrl: 'http://localhost:8000',
            currentCityStateData: null,
            dropDown: "U.S. Avg",
            income: "",
            preTaxIncome: "",
            isFullPageLoad: false,
            isSearchSectionLoad: false,
            stateName: '',
            cityName: null,
            isCityPassed: false,
            stateData: [],
            usData: {"city_name":"Americus GA Micro","state_name":"America","composite_index":100,"buying_house":498033,"renting_house":1514,"utilities":393,"food_n_groceries":120,"healthcare":639,"transportation":64,"miscellaneous":449},
            compareWith: null,
            apiKey: "AIzaSyC_cn8dWgJXUbenY0MqifuEcgSYhCYKLrM",
            newLocation: '',
            stateList: {"Alaska":"AK","Alabama":"AL","Arkansas":"AR","Arizona":"AZ","California":"CA","Colorado":"CO","Connecticut":"CT","District of Columbia":"DC","District Of Columbia":"DC","Delaware":"DE","Florida":"FL","Georgia":"GA","Hawaii":"HI","Iowa":"IA","Idaho":"ID","Illinois":"IL","Indiana":"IN","Kansas":"KS","Kentucky":"KY","Louisiana":"LA","Massachusetts":"MA","Maryland":"MD","Maine":"ME","Michigan":"MI","Minnesota":"MN","Missouri":"MO","Mississippi":"MS","Montana":"MT","North Carolina":"NC","North Dakota":"ND","Nebraska":"NE","New Hampshire":"NH","New Jersey":"NJ","New Mexico":"NM","Nevada":"NV","New York":"NY","Ohio":"OH","Oklahoma":"OK","Oregon":"OR","Pennsylvania":"PA","Rhode Island":"RI","South Carolina":"SC","South Dakota":"SD","Tennessee":"TN","Texas":"TX","Utah":"UT","Virginia":"VA","Vermont":"VT","Washington":"WA","Wisconsin":"WI","West Virginia":"WV","Wyoming":"WY"},
            currentLocation: "",
            currentCity: null,
            currentStateName: null,
            propertiesData: null,
            propertiesCount: null,
            myBarChart: null,
            chartInstance: null,
            hasAnimated: false,
            hasBarAnimated: false,
            canvasVisible: false,
            counter1: 0,
            counter2: 0,
            counter3: 0,
            counter4: 0,
            counter5: 0,
            counter6: 0,
            counter7: 0,
            isCounterDeskTop: true,
            //  isExpanded: false,
            isDescVisible: false,
            isActive: false,
            isMobile: false,

            isModalVisible: false,
            isPropModalVisible: false
        };
    },
    methods: {
        redirectTo(path){
            const router = useRouter();
            router.replace(path)
        },
        handleOnFocus(variable) {
            if (!this.isMapsScriptLoaded) {
                this.loadGoogleMapsScript();
                this.isMapsScript
                Loaded = true;
            }
            this.$refs[variable].classList.add("activeIcon");
        },
        calculatePercentDifference(oldObject, newObject) {
            let differenceSum = 0;
            for (let expense in this.createSchema()) {
                let oldValue = oldObject[expense];
                let newValue = newObject[expense];
                let difference = ((newValue - oldValue) / oldValue) * 100;
                differenceSum += difference;
            }
            return differenceSum / 7;
        },
        toolTipContent() {
            $(".tooltip-1").tooltipster({
                content: $(`
                        <div class="toolTipMainBox">
                            <div class="sellagentBox">
                                <span class="close closePopup"><img loading="lazy" src="/images/propertyDetail/close_black.svg" alt="Close" /></span>
                                <div class="sellAgentHeader">
                                    <p class="toolTipHeadding">Selling with an Agent? Houzeo is Better!</p>
                                    <p class="sellAgentDesc">See how Houzeo compares with a traditional agent</p>
                                </div>
                                <div class="sellAgentBody">
                                    <table>
                                        <thead>
                                            <th></th>
                                            <th> <span> Traditional Agent </span> </th>
                                            <th> <span class="tabLogoHead"> <img loading="lazy" src="https://dtpwvruv8ddnl.cloudfront.net/images/ql-v4/new-logo.svg" alt="logo" class="mainLogo" /> </span> </th>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="firstCol"> <p>Your Savings</p> </td>
                                                <td class="secCol"> <img loading="lazy" class="close" src="https://dtpwvruv8ddnl.cloudfront.net/images/ql-v4/tabClose.png" alt="close" /></td>
                                                <td class="thirdCol"> $27,500 </td>
                                            </tr>
                                            <tr>
                                                <td class="firstCol"> <p>100% Online</p> </td>
                                                <td class="secCol"> <img loading="lazy" class="close" src="https://dtpwvruv8ddnl.cloudfront.net/images/ql-v4/tabClose.png" alt="close" /> </td>
                                                <td class="thirdCol"> <img loading="lazy" class="check" src="https://dtpwvruv8ddnl.cloudfront.net/images/ql-v4/tabCheck.png" alt="close" /> </td>
                                            </tr>
                                            <tr>
                                                <td class="firstCol"> <p>Mobile App</p> </td>
                                                <td class="secCol"> <img loading="lazy" class="close" src="https://dtpwvruv8ddnl.cloudfront.net/images/ql-v4/tabClose.png" alt="close" /> </td>
                                                <td class="thirdCol"> <img loading="lazy" class="check" src="https://dtpwvruv8ddnl.cloudfront.net/images/ql-v4/tabCheck.png" alt="close" /> </td>
                                            </tr>
                                            <tr>
                                                <td class="firstCol"> <p>Fast Listing</p> </td>
                                                <td class="secCol"> <img loading="lazy" class="close" src="https://dtpwvruv8ddnl.cloudfront.net/images/ql-v4/tabClose.png" alt="close" /> </td>
                                                <td class="thirdCol"> <img loading="lazy" class="check" src="https://dtpwvruv8ddnl.cloudfront.net/images/ql-v4/tabCheck.png" alt="close" /> </td>
                                            </tr>
                                            <tr>
                                                <td class="firstCol"> <p>Fast Listing Changes</p> </td>
                                                <td class="secCol"> <img loading="lazy" class="close" src="https://dtpwvruv8ddnl.cloudfront.net/images/ql-v4/tabClose.png" alt="close" /> </td>
                                                <td class="thirdCol"> <img loading="lazy" class="check" src="https://dtpwvruv8ddnl.cloudfront.net/images/ql-v4/tabCheck.png" alt="close" /> </td>
                                            </tr>
                                            <tr>
                                                <td class="firstCol"> <p>Online Showings</p> </td>
                                                <td class="secCol"> <img loading="lazy" class="close" src="https://dtpwvruv8ddnl.cloudfront.net/images/ql-v4/tabClose.png" alt="close" /> </td>
                                                <td class="thirdCol"> <img loading="lazy" class="check" src="https://dtpwvruv8ddnl.cloudfront.net/images/ql-v4/tabCheck.png" alt="close" /> </td>
                                            </tr>
                                            <tr>
                                                <td class="firstCol"> <p>Offers Directly to You</p> </td>
                                                <td class="secCol"> <img loading="lazy" class="close" src="https://dtpwvruv8ddnl.cloudfront.net/images/ql-v4/tabClose.png" alt="close" /> </td>
                                                <td class="thirdCol"> <img loading="lazy" class="check" src="https://dtpwvruv8ddnl.cloudfront.net/images/ql-v4/tabCheck.png" alt="close" /> </td>
                                            </tr>
                                            <tr>
                                                <td class="firstCol"> <p>5-Star Customer Service</p> </td>
                                                <td class="secCol"> <img loading="lazy" class="close" src="https://dtpwvruv8ddnl.cloudfront.net/images/ql-v4/tabClose.png" alt="close" /> </td>
                                                <td class="thirdCol"> <img loading="lazy" class="check" src="https://dtpwvruv8ddnl.cloudfront.net/images/ql-v4/tabCheck.png" alt="close" /> </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    `),
                animation: "grow",
                fixedWidth: 300,
                maxWidth: 823,
                theme: "tooltipster-default",
                interactive: true,
                autoClose: true,
                hideOnClick: true,
                position: "top-left",
                trigger: this.isMobile ? "click" : "hover",
                functionReady: function () {
                    if (window.matchMedia("(max-width: 700px)").matches) {
                        $("body").removeAttr("style");
                        $("body").css("overflow-y", "hidden");
                        $(".closePopup").click(function () {
                            $(".tooltip-1").tooltipster("hide");
                            $("body").css("overflow", "visible");
                        });
                    }
                }
            });
        },
        async handleDropDownChange() {
            if (this.dropDown === "U.S. Avg") {
                this.compareWith = this.usData;
            } else if (this.dropDown === `${this.currentCity}`) {
                this.compareWith = this.curLocData;
            } else if (this.dropDown === `${this.currentStateName}'s Avg`) {
                if (this.stateAverage?.state_name !== this.currentStateName) {
                    try {
                        this.isFullPageLoad = true;
                        let rawRes = await fetch(`${this.backend_url}/api/col-state-avg`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                state: this.currentStateName
                            })
                        });
                        let res = await rawRes.json();
                        this.isFullPageLoad = false;
                        this.stateAverage = res.data.stateAverage;
                    } catch (e) {
                        this.isFullPageLoad = false;
                        console.log("error fetching new data", e);
                    }
                }
                this.compareWith = this.stateAverage;
            } else if (this.dropDown === "Los Angeles") {
                this.compareWith = this.topCitiesData[1];
            } else {
                let city = this.topCitiesData.filter((city) => city.city_name === this.dropDown)[0];
                if (city) {
                    this.compareWith = city;
                } else {
                    return;
                }
            }
            this.initCounterAnimation(this.newLocData);
        },
        async fetchNewLocationData(state, city) {
            try {
                this.isFullPageLoad = true;
                let rawRes = await fetch(`${this.backend_url}/api/col-city-state-data`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        state: state,
                        city: city
                    })
                });
                let res = await rawRes.json();
                this.isFullPageLoad = false;

                return res;
            } catch (e) {
                this.isFullPageLoad = false;
                console.log("error fetching new data", e);
            }
        },
        async handleFormSubmit() {
            let formErr = document.getElementById("form-err");
            formErr.innerText = "";
            document.getElementsByClassName("currentLocationErr")[0].innerText = "";
            document.getElementsByClassName("taxIncomeErr")[0].innerText = "";
            if (this.newLocation && (this.currentCity || this.currentStateName) && this.income && this.income >= 50000 && this.currentLocation && this.newLocation) {
                this.isSearchSectionLoad = true;
                fetch(`${this.backend_url}/api/pull/home-for-sale-widget-api/${this.stateList[this.stateName]}${this.isCityPassed ? `/${this.cityName.toLowerCase()}` : ""}?min-price=${this.income * 0.8}&max-price=${this.income}`)
                    .then((rawRes) => {
                        return rawRes.ok ? rawRes.json() : { data: { state_count: 0 } };
                    })
                    .then((res) => {
                        this.propertiesCount = res.data.state_count;
                        this.propertiesData = res.data.properties_data;
                        this.isSearchSectionLoad = false;
                        this.openPropVisibleModal();
                    })
                    .catch((e) => {
                        this.isSearchSectionLoad = false;
                        console.log("error fetching homes");
                        this.propertiesCount = 0;
                    });
                return;
            }

            if (!this.income && !this.currentCity && !this.currentStateName) {
                formErr.innerText = "Please enter Current Location & Your Pre-Tax Income";
                document.getElementsByClassName("currentLocationErr")[0].innerText = "Please enter Current Location";
                document.getElementsByClassName("taxIncomeErr")[0].innerText = "Please enter Your Pre-Tax Income";
            } else if (this.income < 50000) {
                formErr.innerText = "Please enter income above $50,000";
                document.getElementsByClassName("taxIncomeErr")[0].innerText = "Please enter income above $50,000";
            } else if (!this.income) {
                formErr.innerText = "Please enter Your Pre-Tax Income";
                document.getElementsByClassName("taxIncomeErr")[0].innerText = "Please enter Your Pre-Tax Income";
            } else if (!this.currentCity && !this.currentStateName && this.currentLocation.length !== 0) {
                formErr.innerText = "Please select your current location from the dropdown";
                document.getElementsByClassName("currentLocationErr")[0].innerText = "Please select your current location from the dropdown";
            } else if ((!this.currentCity && !this.currentStateName) || !this.currentLocation) {
                formErr.innerText = "Please enter Your Current Location";
                document.getElementsByClassName("currentLocationErr")[0].innerText = "Please enter Your Current Location";
            } else if (!this.newLocation || !this.stateName) {
                formErr.innerText = "Please enter Your New Location";
                document.getElementById("newLocErr").innerText = "Please enter Your New Location";
            }
        },
        calculateAvg(location) {
            let schema = this.createSchema();
            let sum = 0;
            for (let expense in schema) {
                sum += location[expense];
            }
            return sum / 7;
        },
        selectGraphColor(expenseKey) {
            let green = this.nationComparisonData?.[expenseKey] <= 0;
            return {
                color: green ? "graphColorGreen" : "graphColorRed",
                img: green ? "https://dtpwvruv8ddnl.cloudfront.net/images/cost-of-living/green-graph.svg" : "https://dtpwvruv8ddnl.cloudfront.net/images/cost-of-living/red-graph.svg"
            };
        },
        compareValues(cityAValue, cityBValue) {
            if (cityAValue === 0) {
                // Handle division by zero (to avoid errors)
                return NaN;
            }
            return 100 * ((cityBValue - cityAValue) / cityAValue);
        },
        createSchema() {
            return {
                buying_house: 0,
                food_n_groceries: 0,
                healthcare: 0,
                miscellaneous: 0,
                renting_house: 0,
                transportation: 0,
                utilities: 0,
                composite_index: 0
            };
        },
        loadGoogleMapsScript() {
            if (!window.googleMap) {
                const script = document.createElement("script");
                script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&libraries=places`;
                script.async = true;
                script.defer = true;
                script.onload = () => {
                    window.googleMap = window.google;
                    this.initAutocomplete();
                };
                document.head.appendChild(script);
            } else {
                this.initAutocomplete();
            }
        },
        initAutocomplete() {
            const currentLocationInput = document.getElementById("currentLocation");
            const newLocationInput = document.getElementById("newLocation");
            const options = {
                types: ["(regions)"],
                componentRestrictions: { country: "us" }
            };

            const currentLocationAutocomplete = new window.googleMap.maps.places.Autocomplete(currentLocationInput, options);
            const newLocationAutocomplete = new window.googleMap.maps.places.Autocomplete(newLocationInput, options);

            currentLocationAutocomplete.addListener("place_changed", async () => {
                let mobErr = document.querySelector("#form-err");
                let formErr = document.querySelector(".currentLocationErr");
                formErr.innerText = "";

                const place = currentLocationAutocomplete.getPlace();
                const addressComponents = place.address_components;
                let city = "";
                let state = "";
                let fullState = "";
                // this.currentCity = "";
                // this.currentStateName = "";
                addressComponents.forEach((component) => {
                    const types = component.types;

                    if (types.includes("locality")) {
                        city = component.long_name;
                    }
                    if (types.includes("administrative_area_level_1")) {
                        state = component.short_name;
                        fullState = this.convertToWordCase(component.long_name);
                    }
                });
                let backup = this.currentCity ? `${this.currentCity}, ${this.stateList[this.currentStateName]}` : `${this.currentStateName}`;
                if (this.stateList[fullState]) {
                    this.currentLocation = city ? `${city}, ${state}` : `${fullState}`;
                }
                // else this.currentStateName = "Florida";
                this.curLocChanged = true;
                if (this.curLocChanged) {
                    this.isSearchSectionLoad = true;
                    this.curLocationLoad = true;
                    let res = await this.fetchNewLocationData(fullState, city);
                    if (!res.status) {
                        let text = "Select another current location";
                        formErr.innerText = text;
                        mobErr.innerText = text;
                        this.currentLocation = backup;
                        this.curLocChanged = false;
                        this.isSearchSectionLoad = false;
                        this.curLocationLoad = false;
                        return;
                    }
                    this.currentCity = city;
                    this.currentStateName = fullState;
                    this.curLocationLoad = false;
                    this.currentCityStateData = res.data.stateData;
                    this.dropDown = `${this.currentCity ? this.currentCity : `${this.currentStateName}'s Avg`}`;
                    this.handleDropDownChange();
                    this.curLocChanged = false;
                    this.isSearchSectionLoad = false;
                }
            });

            newLocationAutocomplete.addListener("place_changed", async () => {
                let mobErr = document.querySelector("#form-err");
                let formErr = document.querySelector("#newLocErr");
                formErr.innerText = "";
                const place = newLocationAutocomplete.getPlace();
                const addressComponents = place.address_components;
                let city = "";
                let state = "";
                let fullState = "";
                this.isCityPassed = false;
                addressComponents.forEach((component) => {
                    const types = component.types;

                    if (types.includes("locality")) {
                        city = component.long_name;
                    }
                    if (types.includes("administrative_area_level_1")) {
                        state = component.short_name;
                        fullState = this.convertToWordCase(component.long_name);
                    }
                });
                let backup = this.cityName ? `${this.cityName}, ${this.stateList[this.stateName]}` : `${this.stateName}`;
                if (this.stateList[this.stateName]) {
                    this.newLocation = city ? `${city}, ${state}` : `${fullState}`;
                    this.isCityPassed = city ? true : false;
                } else this.stateName = "Florida";
                this.isSearchSectionLoad = true;
                this.newLocationLoad = true;
                let res = await this.fetchNewLocationData(fullState, city);
                if (!res.status) {
                    let text = "Select another new location";
                    formErr.innerText = text;
                    mobErr.innerText = text;
                    this.isCityPassed = Boolean(this.cityName);
                    this.newLocation = backup;
                    this.isSearchSectionLoad = false;
                    this.newLocationLoad = false;
                    return;
                }
                this.cityName = city;
                this.stateName = fullState;
                this.changeUrlByStateCity(this.stateName, this.cityName);

                this.isSearchSectionLoad = true;
                this.newLocationLoad = true;
                this.$refs?.mortgageRef?.setDefaults();
                this.isSearchSectionLoad = false;
                this.newLocationLoad = false;
                this.propertiesCount = res?.data?.propertiesCount;
                this.propertiesData = res?.data?.propertiesData;
                this.stateData = res?.data?.stateData;
                this.faqs = res?.data?.siteData?.faqs;
                this.propertiesCount = res?.data?.propertiesCount;
            });
        },
        changeUrlByStateCity(state, city = null) {
            let urlObj = new URL(window.location.href);
            let segments = urlObj.pathname.split("/");
            segments[2] = state.replace(/\s+/g, "-").toLowerCase();
            if (city) segments[3] = city.replace(/\s+/g, "-").toLowerCase();
            else segments[3] = "";
            urlObj.pathname = segments.join("/");
            history.replaceState(null, "", urlObj.toString());
        },
        toggleReadMore() {
            if (this.isMobile) {
                this.isDescVisible = !this.isDescVisible;
                this.isActive = this.isDescVisible;
            }
        },
        checkMobile() {
            this.isMobile = window.innerWidth <= 768;
        },
        openVisibleModal() {
            document.querySelector(".custom-navbar").style.zIndex = 0;
            this.isModalVisible = true;
        },
        closeVisibleModal() {
            this.isModalVisible = false;
        },

        onMouseOver(event) {
            var coordinate = $(event.currentTarget).position();
            var divWidth = $(event.currentTarget).innerWidth();
            var divHeight = $(event.currentTarget).innerHeight();
            if ($(event.currentTarget).hasClass("cocMidDiffCard")) {
                $(".borderDiv").css({
                    opacity: 1,
                    top: coordinate.top,
                    left: coordinate.left,
                    width: divWidth,
                    height: divHeight,
                    zIndex: 1,
                    marginLeft: "1px"
                });
                setTimeout(() => {
                    $(".borderDiv").css({ opacity: 0, zIndex: -1 });
                }, 200);
            } else {
                $(".borderDiv").css({
                    opacity: 1,
                    top: coordinate.top,
                    left: coordinate.left,
                    width: divWidth,
                    height: divHeight,
                    zIndex: 1,
                    marginLeft: "13px"
                });
            }
        },
        onMouseOut() {
            $(".borderDiv").css({ opacity: 0, zIndex: -1 });
        },
        openPropVisibleModal() {
            this.isPropModalVisible = true;
        },
        closePropVisibleModal() {
            this.isPropModalVisible = false;
        },
        animateValue(counter, end, duration) {
            let startTime = null;
            const step = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = timestamp - startTime;
                this[counter] = Math.min(Math.ceil((end * progress) / duration), end);
                if (progress < duration) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        },
        displayValue(counter, finalValue) {
            return Math.round(counter);
        },
        renderChart() {
            console.log("rendering chart")
            if (this.showBarChart && !this.isCityPassed) {
                const ctx = document.getElementById("myBarChart").getContext("2d");
                if (this.myBarChart) {
                    this.myBarChart.destroy();
                }
                const redGradient = ctx.createLinearGradient(0, 300, 0, 0);
                redGradient.addColorStop(1, "#9d2206");
                redGradient.addColorStop(0, "#ff7c48");

                const greenGradient = ctx.createLinearGradient(0, 0, 0, 300);
                greenGradient.addColorStop(1, "#25AF60");
                greenGradient.addColorStop(0, "#74e90d");
                // Load Chart.js and ChartDataLabels dynamically without blocking other code
                import("chart.js").then(({ Chart, BarController, CategoryScale, LinearScale, BarElement, Tooltip }) => {
                    import("chartjs-plugin-datalabels").then((ChartDataLabels) => {
                        // Register Chart.js components and datalabels plugin
                        Chart.register(BarController, CategoryScale, LinearScale, BarElement, Tooltip, ChartDataLabels.default);
                        // Create the chart once the modules are loaded
                        console.log('creating new chart syntax')
                        this.myBarChart = new Chart(ctx, {
                            type: "bar",
                            data: {
                                labels: this.stateCitiesComparedPercentData.map((city) => {
                                    return this.isMobile ? city.label : city.label.split(" ");
                                }),
                                datasets: [
                                    {
                                        axis: "y",
                                        data: this.stateCitiesComparedPercentData.map((city) => city.value),
                                        backgroundColor: function (context) {
                                            const value = context.dataset.data[context.dataIndex];
                                            return value >= 0 ? redGradient : greenGradient;
                                        },
                                        borderColor: function (context) {
                                            const value = context.raw;
                                            return value >= 0 ? "#d33a26" : "#25AF60";
                                        },
                                        borderWidth: 0,
                                        barThickness: this.isMobile ? 8 : 20
                                    }
                                ]
                            },
                            options: {
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: this.updateScaleOfBarGraph,
                                plugins: {
                                    legend: {
                                        display: false
                                    },
                                    tooltip: {
                                        enabled: true,
                                        callbacks: {
                                            title: function (tooltipItem) {
                                                if (this.isMobile) {
                                                    return tooltipItem[0].label.replaceAll(",", " ");
                                                }
                                            }
                                        }
                                    },
                                    datalabels: {
                                        anchor: function (context) {
                                            const value = context.dataset.data[context.dataIndex];
                                            return value > 0 ? "end" : value < 0 ? "start" : "center";
                                        },
                                        align: function (context) {
                                            const value = context.dataset.data[context.dataIndex];
                                            return value > 0 ? "end" : value < 0 ? "start" : "center";
                                        },
                                        formatter: function (value) {
                                            return Math.abs(value) + "%";
                                        },
                                        color: "#fff",
                                        font: {
                                            weight: "bold",
                                            family: "Poppins, sans-serif",
                                            size: this.isMobile ? 10 : 14
                                        },
                                        offset: function (context) {
                                            return context.dataset.data[context.dataIndex] != 0 ? 5 : 0;
                                        },
                                        backgroundColor: function (context) {
                                            const value = context.dataset.data[context.dataIndex];
                                            return value > 0 ? "#C13515" : value < 0 ? "#25AF60" : "#E5E5E5";
                                        },
                                        borderRadius: 4,
                                        padding: {
                                            top: 6,
                                            right: 7,
                                            bottom: 6,
                                            left: 7
                                        }
                                    }
                                },
                                indexAxis: this.isMobile ? "y" : "x",
                                elements: {
                                    bar: {
                                        borderWidth: 2
                                    }
                                }
                            }
                        });
                    });
                });

                // Rest of your non-blocking code can go here
            }
        },
        setupObserver() {
            const options = {
                threshold: 0,
                rootMargin: "900px"
            };

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !this.hasBarAnimated && this.showBarChart) {
                        this.renderChart();
                        this.hasBarAnimated = true;
                    }
                });
            }, options);

            observer.observe(this.$refs.chartContainer);
        },
        setupIntersectionCardObserver() {
            // Create an Intersection Observer instance
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            // Add the class to animate the card
                            entry.target.classList.add("is-visible");
                        } else {
                            // Remove the class if the element is not in view
                            entry.target.classList.remove("is-visible");
                        }
                    });
                },
                { threshold: 0.5 }
            ); // Adjust the threshold as needed

            // Observe each card
            const cards = [this.$refs.card1, this.$refs.card2, this.$refs.card3, this.$refs.card4, this.$refs.card5, this.$refs.card6, this.$refs.card7, this.$refs.card8];
            cards.forEach((card) => observer.observe(card));
        },
        initCounterAnimation(location) {
            this.isCounterDesktop = window.innerWidth > 768;
            if (this.isCounterDesktop) {
                this.animateValue("counter1", Math.abs(this.nationComparisonData?.buying_house), 1100);
                this.animateValue("counter2", Math.abs(this.nationComparisonData?.renting_house), 1100);
                this.animateValue("counter3", Math.abs(this.nationComparisonData?.utilities), 1100);
                this.animateValue("counter4", Math.abs(this.nationComparisonData?.food_n_groceries), 1100);
                this.animateValue("counter5", Math.abs(this.nationComparisonData?.healthcare), 1100);
                this.animateValue("counter6", Math.abs(this.nationComparisonData?.transportation), 1100);
                this.animateValue("counter7", Math.abs(this.nationComparisonData?.miscellaneous), 1100);
            } else {
                this.counter1 = Math.abs(this.nationComparisonData?.buying_house);
                this.counter2 = Math.abs(this.nationComparisonData?.renting_house);
                this.counter3 = Math.abs(this.nationComparisonData?.utilities);
                this.counter4 = Math.abs(this.nationComparisonData?.food_n_groceries);
                this.counter5 = Math.abs(this.nationComparisonData?.healthcare);
                this.counter6 = Math.abs(this.nationComparisonData?.transportation);
                this.counter7 = Math.abs(this.nationComparisonData?.miscellaneous);
            }
        },
        handleCityStateChange() {
            this.initCounterAnimation(this.newLocData);
            this.renderChart();
        },
        commaFormatting(value) {
            return new Intl.NumberFormat("en-US").format(Number(String(value).replaceAll(",", "")));
        },
        onInputPreTaxIncome(event) {
            let inputValue = event.target.value;
            inputValue = inputValue.replace(/[^0-9]/g, "").slice(0, 7);

            if (inputValue === "") {
                this.income = 0;
                this.preTaxIncome = ""; // Set to empty to allow full deletion
                document.getElementsByClassName("taxIncomeErr")[0].innerText = "Please enter Your Pre-Tax Income";
                document.getElementById("form-err").innerText = "Please enter Your Pre-Tax Income";
                return;
            }

            this.income = Number(inputValue);
            this.preTaxIncome = new Intl.NumberFormat("en-US").format(this.income);

            // Set limits
            if (this.income > 9999999) {
                this.income = 9999999;
                this.preTaxIncome = new Intl.NumberFormat("en-US").format(9999999);
            }
            if (this.income >= 50000) {
                document.getElementsByClassName("taxIncomeErr")[0].innerText = "";
                document.getElementById("form-err").innerText = "";
            } else {
                document.getElementsByClassName("taxIncomeErr")[0].innerText = "Please enter income above $50,000";
                document.getElementById("form-err").innerText = "Please enter income above $50,000";
            }
        },
        urlFriendlyString(string) {
            return string.replace(/%20/g, "-").replace(/ /g, "-").toLowerCase();
        },
        newCurComparison() {
            return Math.round(this.calculatePercentDifference(this.curLocData, this.newLocData));
        },
        convertToWordCase(str) {
            return str.replace(/\w\S*/g, (txt) => {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        },

        loadScript(url, callback) {
            const scripts = document.getElementsByTagName("script");
            for (let i = 0; i < scripts.length; i++) {
                if (scripts[i].src.includes(url)) {
                    if (callback && typeof callback === "function") {
                        callback();
                    }

                    return;
                }
            }
            const scriptElement = document.createElement("script");
            scriptElement.src = url;
            scriptElement.onload = function () {
                if (callback && typeof callback === "function") {
                    callback();
                }
            };
            document.body.appendChild(scriptElement);
        },
        loadCSS(url) {
            const links = document.getElementsByTagName("link");
            for (let i = 0; i < links.length; i++) {
                if (links[i].href.includes(url)) {
                    return false;
                }
            }
            const linkElement = document.createElement("link");
            linkElement.rel = "stylesheet";
            linkElement.href = url;
            document.head.appendChild(linkElement);
        },
        handleSellThisPropertyClick(tab, buttonName) {
            this.listingDataJSON.street = this.stateName;
            this.listingDataJSON.suite = "";
            this.listingDataJSON.city = this.isCityPassed ? this.cityName : "";
            this.listingDataJSON.state = this.stateName;
            this.listingDataJSON.zip = "";

            let addressArray = {
                street: this.listingDataJSON.street,
                suite: this.listingDataJSON.suite,
                city: this.listingDataJSON.city,
                state: this.listingDataJSON.state,
                zip: this.listingDataJSON.zip
            };

            this.utm_data = this.getCookie("utm_data");
            if (this.utm_data != null) {
                this.utm_data = JSON.parse(this.utm_data);
                this.listingDataJSON.utm_slug = this.utm_data.utm_slug;
                this.listingDataJSON.utm_source = this.utm_data.utm_source;
                this.listingDataJSON.utm_medium = this.utm_data.utm_medium;
                this.listingDataJSON.pre_registration_slug = this.utm_data.pre_registration_slug;
                this.listingDataJSON.pre_registration_source = this.utm_data.pre_registration_source;
                this.listingDataJSON.pre_registration_medium = this.utm_data.pre_registration_medium;
                this.listingDataJSON.ppc_slug = this.utm_data.ppc_slug;
                this.listingDataJSON.ppc_source = this.utm_data.ppc_source;
                this.listingDataJSON.ppc_medium = this.utm_data.ppc_medium;
            }

            this.listingDataJSON.article_slug = window.location.href;
            this.listingDataJSON.siteurl_qlb = window.location.origin;
            this.listingDataJSON.googleAddress = true;
            this.listingDataJSON.address = addressArray;

            this.listingDataJSON.clickButtonName = buttonName;
            this.openQuickListingIframe();
        },
        openQuickListingIframe() {
            const querystring = this.encodeQueryData(this.listingDataJSON);
            document.querySelector(".quick-listing-popup").style.display = "block";
            document.querySelector(".quick-listing-popup").style.opacity = "1";
            document.querySelector("body").style.overflow = "hidden";
            document.querySelector("body").classList.add("quickPopup");

            var iframe = document.createElement("iframe");
            iframe.src = this.listingDataJSON.siteurl_qlb + "/quick-listing-block?" + querystring;
            iframe.frameborder = "1";
            iframe.id = "quick-listing-iframe";
            iframe.width = "100%";
            iframe.height = "446px";
            iframe.class = "quick_listing_iframe";
            iframe.style = "width:100%;height:100%;border:0";

            document.querySelector(".quick-listing-popup").appendChild(iframe);
            document.querySelector(".quick-listing-popup").style.display = "block";
        },
        getCookie(name) {
            const decodedCookie = decodeURIComponent(document.cookie);
            const cookiesArray = decodedCookie.split(";");

            for (let i = 0; i < cookiesArray.length; i++) {
                let cookie = cookiesArray[i].trim();
                if (cookie.indexOf(name + "=") === 0) {
                    return cookie.substring(name.length + 1);
                }
            }
            return null;
        },
        encodeQueryData(data) {
            const ret = [];
            for (let d in data) ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
            return ret.join("&");
        },
        placeExists(place, isCity) {
            if (isCity) {
                return this.availableCities.includes(place);
            } else {
                return this.stateList[place];
            }
        },
        checkValidPath(){
            console.log('checking path', this.stateName, this.stateData)
            if((this.stateName.toLowerCase() !== 'florida' && this.stateName) && this.stateData?.[0].state_name.toLowerCase() === 'fl'){
                this.redirectTo('/404')
                return false
            }
        },
    },
    watch: {
        disableOverflow(newValue) {
            if (newValue) {
                document.querySelector(".custom-navbar").style.zIndex = 0;
                document.body.style.overflow = "hidden";
            } else {
                document.querySelector(".custom-navbar").style.zIndex = 999;
                document.body.style.overflow = "auto";
            }
        },
        stateData: "handleCityStateChange"
    },
    computed: {
        hfsLink() {
            const formattedState = this.stateName.toLowerCase().replace(/\s+/g, "-");
            const formattedCity = this.isCityPassed ? this.cityName.toLowerCase().replace(/\s+/g, "-") : '';
            return `/homes-for-sale/${formattedState}/${formattedCity}`;
        },
        disableOverflow() {
            return this.isModalVisible || this.isPropModalVisible;
        },
        cityCount() {
            return this.myBarChart?.data?.datasets?.[0]?.data?.length || 10;
        },
        stateCitiesComparedPercentData() {
            return this.stateData
                .map((city) => {
                    return { label: city.city_name, value: Math.round(this.calculatePercentDifference(this.usData, city)) };
                })
                .sort((a, b) => b.value - a.value);
        },
        highestCityAverage() {
            const comparedValues = this.stateCitiesComparedPercentData.map((city) => city.value);
            return Math.max(...comparedValues);
        },
        lowestCityAverage() {
            const comparedValues = this.stateCitiesComparedPercentData.map((city) => city.value); // Access the computed property
            return Math.min(...comparedValues);
        },
        nationComparisonData() {
            let data = this.createSchema();
            for (let expense in data) {
                data[expense] = this.compareValues(this.compareWith[expense], this.newLocData[expense]);
            }
            return data;
        },
        overallComparisonPercent() {
            return Math.round(this.newLocData.composite_index - this.compareWith.composite_index);
        },
        newCityState() {
            return this.cityName ? this.cityName : this.stateName;
        },
        curLocData() {
            if (this.currentStateName) {
                let avgData = this.createSchema();
                let cityCount = 0;

                for (let city of this.currentCityStateData) {
                    cityCount++;
                    for (let expense in avgData) {
                        avgData[expense] += city[expense];
                    }
                }

                if (cityCount > 0) {
                    for (let expense in avgData) {
                        avgData[expense] = avgData[expense] / cityCount;
                    }
                } else {
                    return "No cities found for the state";
                }
                return avgData;
            }
            return "Not Found";
        },
        newLocData() {
            if (this.isCityPassed) {
                for (let city of this.stateData) {
                    if (this.cityName === city.city_name) {
                        return city;
                    }
                }
            }

            if (this.stateName) {
                let avgData = this.createSchema();
                let cityCount = 0;

                for (let city of this.stateData) {
                    cityCount++;
                    for (let expense in avgData) {
                        avgData[expense] += city[expense];
                    }
                }

                if (cityCount > 0) {
                    for (let expense in avgData) {
                        avgData[expense] = avgData[expense] / cityCount;
                    }
                } else {
                    return "No cities found for the state";
                }
                return avgData;
            }

            return "Not Found";
        },
        showBarChart() {
            return !this.cityName && !this.isSearchSectionLoad;
        },
        updateBarGraphSize() {
            return this.isMobile ? "367" : "370";
        },
        updateScaleOfBarGraph() {
            if (this.isMobile) {
                return {
                    x: {
                        beginAtZero: true,
                        max: Math.ceil((this.highestCityAverage + 5) / 5) * 5,
                        min: Math.floor((this.lowestCityAverage - 6) / 5) * 5,
                        ticks: {
                            callback: function (value) {
                                return value + "%";
                            }
                        },
                        border: {
                            display: false
                        }
                    },
                    y: {
                        grid: {
                            display: false // Remove vertical grid lines
                        },
                        border: {
                            display: false
                        }
                    }
                };
            } else {
                return {
                    y: {
                        beginAtZero: true,
                        max: Math.ceil((this.highestCityAverage + 5) / 5) * 5,
                        min: Math.floor((this.lowestCityAverage - 5) / 5) * 5,
                        ticks: {
                            padding: 15,
                            callback: function (value) {
                                return value + "%";
                            },
                            font: {
                                family: "Poppins",
                                size: 12
                            }
                        },
                        border: {
                            display: false
                        }
                    },
                    x: {
                        grid: {
                            display: false // Remove vertical grid lines
                        },
                        ticks: {
                            font: {
                                family: "Poppins",
                                size: 11
                            }
                        },
                        border: {
                            display: false
                        }
                    }
                };
            }
        },
        comparedWithOptions() {
            let data = ["U.S. Avg", this.dropDown];
            if (this.currentStateName && !this.isSearchSectionLoad) {
                data.push(`${this.currentStateName}'s Avg`);
            }
            if (this.currentCity && !this.isSearchSectionLoad && !this.topCities.includes(this.currentCity)) {
                data.push(`${this.currentCity}`);
            }
            data.push(...this.topCities);
            return [...new Set(data)];
        }
    },
    created(){
        this.compareWith = this.usData
    },
    mounted() {
        const route = useRoute();
        const slug = route.params.slug
        this.stateName = slug[0]
        this.cityName = slug?.[1]
        this.isCityPassed = Boolean(this.cityName)
        this.fetchNewLocationData(this.stateName, this.cityName)
        .then(res => {
            console.log('value of init res', res)
            this.stateData = res.data.stateData
            this.defaultData = res.data.defaultData
            // this.checkValidPath()
        })
        if (this.showBarChart) this.setupObserver();        
        fetch(`${this.backend_url}/api/pull/home-for-sale-widget-api/${this.stateList[slug[0].charAt(0).toUpperCase() + slug[0].slice(1)]}${this.isCityPassed ? `/${this.cityName.toLowerCase()}` : ""}`)
            .then((rawRes) => {
                return rawRes.ok ? rawRes.json() : { data: { state_count: 0 } };
            })
            .then((res) => {
                this.propertiesCount = res.data.state_count;
                this.isFetchingHome = false;
            })
            .catch((e) => {
                console.log("error fetching homes");
                this.propertiesCount = 0;
            });
    
        this.isFullPageLoad = false;
        this.initCounterAnimation(this.newLocData);
        this.newLocation = this.isCityPassed ? `${this.cityName}, ${this.stateList[this.stateName]}` : `${this.stateName}`;
        window.addEventListener("resize", this.checkMobile);
        // this.setupIntersectionCardObserver();
    },
    beforeDestroy() {
        if (this.chartInstance) {
            this.chartInstance.destroy();
        }
        window.removeEventListener("resize", this.checkMobile);
    },
    directives: {
        clickOutside: {
            bind(el, binding, vnode) {
                el.clickOutsideEvent = function (event) {
                    if (!(el == event.target || el.contains(event.target))) {
                        vnode.context[binding.expression](event);
                    }
                };
                document.body.addEventListener("click", el.clickOutsideEvent);
            },
            unbind(el) {
                document.body.removeEventListener("click", el.clickOutsideEvent);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@use '../../assets/styles/cost-of-living.scss'; // Import SCSS file

/* You can also write additional styles directly here */
</style>