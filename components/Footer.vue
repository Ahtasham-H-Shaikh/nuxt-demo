<template>
    <div class="commonVueFooterBg">
        <div class="commonFooterContainer">

            <div class="commonFooterFlex">
                <div class="commonFooterList">

                    <ul class="cmnFtrLinks">
                        <li><a href="/homes-for-sale" class="item">Buy</a></li>
                        <li><a href="/pricing" class="item">Pricing</a></li>
                        <li><a href="/flat-fee-mls" class="item">Flat Fee MLS</a></li>
                        <li><a href="/FOR-SALE-BY-OWNER" class="item">For Sale By Owner</a></li>
                        <li><a href="/faq" class="item">FAQ</a></li>
                        <li><a href="/blog/how-to-sell-a-house-by-owner/" class="item">Seller Guide</a></li>
                        <li><a href="/how-much-is-my-house-worth" class="item">What’s My Home Worth?</a></li>
                        <li><a href="/reviews" class="item">Reviews</a></li>
                        <li><a class="item" href="mailto:support@houzeo.com">Contact Us</a></li>
                        <li><a class="item" href="/terms-of-use">Terms of Use</a></li>
                        <!-- <li><a class="item footerAffiliate" href="/affiliates" style="display: inline-flex !important">
                                Become an Affiliate
                            </a> <span class="footertextBlinkAnimation footertextBlinkAnimationRightSide">New</span></li> -->
                        <li><a class="item" href="/privacypolicy">Privacy Policy</a></li>
                        <li><a href="/refund-policy" class="item">Refund and Cancellation Policy</a></li>
                        <li><a href="/mls-disclaimers" class="item">MLS Disclaimers</a></li>
                    </ul>

                </div>

                <div class="commonFooterList">
                    <span class="commonFooterHead">FLAT FEE MLS</span>
                    <ul class="cmnFtrLinks">
                        <li><a class="item" href="/flat-fee-mls">Flat Fee MLS</a></li>
                        <li><a class="item" href="/flat-fee-mls/alaska"> Alaska Flat Fee MLS </a></li>
                        <li><a class="item" href="/flat-fee-mls/alabama"> Alabama Flat Fee MLS </a></li>
                        <li><a class="item" href="/flat-fee-mls/arkansas"> Arkansas Flat Fee MLS </a></li>
                        <li><a class="item" href="/flat-fee-mls/arizona"> Arizona Flat Fee MLS </a></li>
                        <li><a class="item" href="/flat-fee-mls/california"> California Flat Fee MLS </a></li>
                        <li><a class="item" href="/flat-fee-mls/colorado"> Colorado Flat Fee MLS </a></li>
                        <li><a class="item" href="/flat-fee-mls/connecticut"> Connecticut Flat Fee MLS </a></li>
                        <li><a class="item" href="/flat-fee-mls/district-of-columbia"> District of Columbia Flat Fee MLS </a></li>
                        <li><a class="item" href="/flat-fee-mls/delaware"> Delaware Flat Fee MLS </a></li>
                    </ul>

                    <transition name="fade">
                        <ul v-if="showAdditionalContent1" class="cmnFtrLinks cmnViewMore">
                            <li><a class="item" href="/flat-fee-mls/florida"> Florida Flat Fee MLS </a></li>
                            <li><a class="item" href="/flat-fee-mls/georgia"> Georgia Flat Fee MLS </a></li>
                            <li><a class="item" href="/flat-fee-mls/hawaii"> Hawaii Flat Fee MLS </a></li>
                            <li><a class="item" href="/flat-fee-mls/iowa"> Iowa Flat Fee MLS </a></li>
                            <li><a class="item" href="/flat-fee-mls/idaho"> Idaho Flat Fee MLS </a></li>
                            <li><a class="item" href="/flat-fee-mls/illinois"> Illinois Flat Fee MLS </a></li>
                            <li><a class="item" href="/flat-fee-mls/indiana"> Indiana Flat Fee MLS </a></li>
                            <li><a class="item" href="/flat-fee-mls/kansas"> Kansas Flat Fee MLS </a></li>
                            <li><a class="item" href="/flat-fee-mls/kentucky"> Kentucky Flat Fee MLS </a></li>
                            <li><a class="item" href="/flat-fee-mls/louisiana"> Louisiana Flat Fee MLS </a></li>
                            <li><a class="item" href="/flat-fee-mls/massachusetts"> Massachusetts Flat Fee MLS </a></li>
                            <li><a class="item" href="/flat-fee-mls/maryland"> Maryland Flat Fee MLS </a></li>
                            <li><a class="item" href="/flat-fee-mls/maine"> Maine Flat Fee MLS </a></li>
                            <li><a class="item" href="/flat-fee-mls/michigan"> Michigan Flat Fee MLS </a></li>
                            <li><a class="item" href="/flat-fee-mls/minnesota"> Minnesota Flat Fee MLS </a></li>
                            <li><a class="item" href="/flat-fee-mls/missouri"> Missouri Flat Fee MLS </a></li>
                            <li><a class="item" href="/flat-fee-mls/mississippi"> Mississippi Flat Fee MLS </a></li>
                            <li><a class="item" href="/flat-fee-mls/montana"> Montana Flat Fee MLS </a></li>
                            <li><a class="item" href="/flat-fee-mls/north-carolina"> North Carolina Flat Fee MLS </a></li>
                            <li><a class="item" href="/flat-fee-mls/nebraska"> Nebraska Flat Fee MLS </a></li>
                            <li><a class="item" href="/flat-fee-mls/new-hampshire"> New Hampshire Flat Fee MLS </a></li>
                            <li><a class="item" href="/flat-fee-mls/new-jersey"> New Jersey Flat Fee MLS </a></li>
                            <li><a class="item" href="/flat-fee-mls/new-mexico"> New Mexico Flat Fee MLS </a></li>
                            <li><a class="item" href="/flat-fee-mls/nevada"> Nevada Flat Fee MLS </a></li>
                            <li><a class="item" href="/flat-fee-mls/new-york"> New York Flat Fee MLS </a></li>
                            <li><a class="item" href="/flat-fee-mls/ohio"> Ohio Flat Fee MLS </a></li>
                            <li><a class="item" href="/flat-fee-mls/oklahoma"> Oklahoma Flat Fee MLS </a></li>
                            <li><a class="item" href="/flat-fee-mls/oregon"> Oregon Flat Fee MLS </a></li>
                            <li><a class="item" href="/flat-fee-mls/pennsylvania"> Pennsylvania Flat Fee MLS </a></li>
                            <li><a class="item" href="/flat-fee-mls/rhode-island"> Rhode Island Flat Fee MLS </a></li>
                            <li><a class="item" href="/flat-fee-mls/south-carolina"> South Carolina Flat Fee MLS </a></li>
                            <li><a class="item" href="/flat-fee-mls/south-dakota"> South Dakota Flat Fee MLS </a></li>
                            <li><a class="item" href="/flat-fee-mls/tennessee"> Tennessee Flat Fee MLS </a></li>
                            <li><a class="item" href="/flat-fee-mls/texas"> Texas Flat Fee MLS </a></li>
                            <li><a class="item" href="/flat-fee-mls/utah"> Utah Flat Fee MLS </a></li>
                            <li><a class="item" href="/flat-fee-mls/virginia"> Virginia Flat Fee MLS </a></li>
                            <li><a class="item" href="/flat-fee-mls/vermont"> Vermont Flat Fee MLS </a></li>
                            <li><a class="item" href="/flat-fee-mls/washington"> Washington Flat Fee MLS </a></li>
                            <li><a class="item" href="/flat-fee-mls/wisconsin"> Wisconsin Flat Fee MLS </a></li>
                            <li><a class="item" href="/flat-fee-mls/wyoming"> Wyoming Flat Fee MLS </a></li>
                            <li><a class="item" href="/flat-fee-mls/west-virginia"> West Virginia Flat Fee MLS </a></li>
                        </ul>
                    </transition>

                    <p class="cmnFootViewmore 1" @click="toggleAdditionalContent1">
                        {{ showAdditionalContent1 ? 'View Less' : 'View more...' }}
                    </p>
                    <!-- <p class="cmnFootViewmore" id="vm-fml">View more...</p> -->
                </div>

                <div class="commonFooterList">
                    <span class="commonFooterHead">Homes For Sale</span>
                    <ul class="cmnFtrLinks">
                        <li><a class="item" href="/homes-for-sale">Homes For Sale Near Me</a></li>
                        <li><a class="item" href="/homes-for-sale/alaska"> Alaska Homes For Sale </a></li>
                        <li><a class="item" href="/homes-for-sale/alabama"> Alabama Homes For Sale </a></li>
                        <li><a class="item" href="/homes-for-sale/arkansas"> Arkansas Homes For Sale </a></li>
                        <li><a class="item" href="/homes-for-sale/arizona"> Arizona Homes For Sale </a></li>
                        <li><a class="item" href="/homes-for-sale/california"> California Homes For Sale </a></li>
                        <li><a class="item" href="/homes-for-sale/colorado"> Colorado Homes For Sale </a></li>
                        <li><a class="item" href="/homes-for-sale/connecticut"> Connecticut Homes For Sale </a></li>
                        <li><a class="item" href="/homes-for-sale/district-of-columbia"> District of Columbia Homes For Sale </a></li>
                        <li><a class="item" href="/homes-for-sale/delaware"> Delaware Homes For Sale </a></li>
                    </ul>

                    <transition name="fade">
                        <ul v-if="showAdditionalContent2" class="cmnFtrLinks cmnViewMore">
                            <li><a class="item" href="/homes-for-sale/florida"> Florida Homes For Sale </a></li>
                            <li><a class="item" href="/homes-for-sale/georgia"> Georgia Homes For Sale </a></li>
                            <li><a class="item" href="/homes-for-sale/hawaii"> Hawaii Homes For Sale </a></li>
                            <li><a class="item" href="/homes-for-sale/iowa"> Iowa Homes For Sale </a></li>
                            <li><a class="item" href="/homes-for-sale/idaho"> Idaho Homes For Sale </a></li>
                            <li><a class="item" href="/homes-for-sale/illinois"> Illinois Homes For Sale </a></li>
                            <li><a class="item" href="/homes-for-sale/indiana"> Indiana Homes For Sale </a></li>
                            <li><a class="item" href="/homes-for-sale/kentucky"> Kentucky Homes For Sale </a></li>
                            <li><a class="item" href="/homes-for-sale/louisiana"> Louisiana Homes For Sale </a></li>
                            <li><a class="item" href="/homes-for-sale/massachusetts"> Massachusetts Homes For Sale </a></li>
                            <li><a class="item" href="/homes-for-sale/maryland"> Maryland Homes For Sale </a></li>
                            <li><a class="item" href="/homes-for-sale/maine"> Maine Homes For Sale </a></li>
                            <li><a class="item" href="/homes-for-sale/michigan"> Michigan Homes For Sale </a></li>
                            <li><a class="item" href="/homes-for-sale/minnesota"> Minnesota Homes For Sale </a></li>
                            <li><a class="item" href="/homes-for-sale/missouri"> Missouri Homes For Sale </a></li>
                            <li><a class="item" href="/homes-for-sale/mississippi"> Mississippi Homes For Sale </a></li>
                            <li><a class="item" href="/homes-for-sale/montana"> Montana Homes For Sale </a></li>
                            <li><a class="item" href="/homes-for-sale/north-carolina"> North Carolina Homes For Sale </a></li>
                            <li><a class="item" href="/homes-for-sale/nebraska"> Nebraska Homes For Sale </a></li>
                            <li><a class="item" href="/homes-for-sale/new-hampshire"> New Hampshire Homes For Sale </a></li>
                            <li><a class="item" href="/homes-for-sale/new-jersey"> New Jersey Homes For Sale </a></li>
                            <li><a class="item" href="/homes-for-sale/new-mexico"> New Mexico Homes For Sale </a></li>
                            <li><a class="item" href="/homes-for-sale/nevada"> Nevada Homes For Sale </a></li>
                            <li><a class="item" href="/homes-for-sale/new-york"> New York Homes For Sale </a></li>
                            <li><a class="item" href="/homes-for-sale/ohio"> Ohio Homes For Sale </a></li>
                            <li><a class="item" href="/homes-for-sale/oklahoma"> Oklahoma Homes For Sale </a></li>
                            <li><a class="item" href="/homes-for-sale/oregon"> Oregon Homes For Sale </a></li>
                            <li><a class="item" href="/homes-for-sale/pennsylvania"> Pennsylvania Homes For Sale </a></li>
                            <li><a class="item" href="/homes-for-sale/rhode-island"> Rhode Island Homes For Sale </a></li>
                            <li><a class="item" href="/homes-for-sale/south-carolina"> South Carolina Homes For Sale </a></li>
                            <li><a class="item" href="/homes-for-sale/tennessee"> Tennessee Homes For Sale </a></li>
                            <li><a class="item" href="/homes-for-sale/texas"> Texas Homes For Sale </a></li>
                            <li><a class="item" href="/homes-for-sale/utah"> Utah Homes For Sale </a></li>
                            <li><a class="item" href="/homes-for-sale/virginia"> Virginia Homes For Sale </a></li>
                            <li><a class="item" href="/homes-for-sale/vermont"> Vermont Homes For Sale </a></li>
                            <li><a class="item" href="/homes-for-sale/washington"> Washington Homes For Sale </a></li>
                            <li><a class="item" href="/homes-for-sale/wisconsin"> Wisconsin Homes For Sale </a></li>
                            <li><a class="item" href="/homes-for-sale/wyoming"> Wyoming Homes For Sale </a></li>
                        </ul>
                    </transition>

                    <p class="cmnFootViewmore 2" @click="toggleAdditionalContent2">
                        {{ showAdditionalContent2 ? 'View Less' : 'View more...' }}
                    </p>
                    <!-- <p class="cmnFootViewmore" id="vm-fml">View more...</p> -->

                </div>

                <div class="commonFooterList">
                    <span class="commonFooterHead">TOP REAL ESTATE PROS NEAR YOU</span>
                    <ul class="cmnFtrLinks">
                        <li><a class="item" href="/pros">Pros Near Me</a></li>
                        <li><a class="item" href="/pros/real-estate-attorneys-near-me">Real Estate Attorneys near me</a></li>
                        <li><a class="item" href="/pros/real-estate-agents-near-me">Real Estate Agents and Realtors near me</a></li>
                        <li><a class="item" href="/pros/home-inspectors-near-me">Home Inspectors near me</a></li>
                        <li><a class="item" href="/pros/real-estate-photographers-near-me">Real Estate Photographers near me</a></li>
                        <li><a class="item" href="/pros/surveyors-near-me">Surveyors near me</a></li>
                        <li><a class="item" href="/pros/home-appraisers-near-me">Home Appraisers near me</a></li>
                        <li><a class="item" href="/pros/mortgage-lenders-near-me">Mortgage Lenders near me</a></li>
                        <li><a class="item" href="/pros/title-companies-near-me">Title Companies near me</a></li>
                        <li><a class="item" href="/pros/title-agents-near-me">Title Agents near me</a></li>
                        <li><a class="item" href="/pros/escrow-companies-near-me">Escrow Companies near me</a></li>
                        <li><a class="item" href="/pros/escrow-officers-near-me">Escrow Officers near me</a></li>
                    </ul>
                </div>

                <div class="commonFooterList cmnFootSubsNews">
                    <div class="commonSubscribeWIthSocailMedia cmnFooterBtm">
                        <!-- <div class="commonSubscribeWIthSocailMediaBox">
                            <p class="cmnFootersubscribe_text">Subscribe to our newsletter!</p>
                            <p class="cmnFooterspam-text"><i>Don't worry, we won't spam</i></p>
                            <form action="https://houzeo.us15.list-manage.com/subscribe/post?u=66569ccc0ef81400596406573&amp;id=bc760c4d44" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" novalidate="">
                                <div class="cmnFooterWrapSubscription">
                                    <input name="EMAIL" id="mce-EMAIL" placeholder="Email address" required="">
                                    <input class="ui blue button" type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe">
                                </div>
                            </form>
                        </div> -->
                        <div class="commonPlayAppStoreBox">
                            <div class="callCtaFooter">
                                <p>Need help? <a href="https://calendly.com/support-ngy/houzeo?utm_source=LP_FFM&amp;utm_medium=first_scroll" target="_blank" class="textUnderLine">Schedule a free call</a> </p>
                            </div>
                            <div class="downloadAppStoreCta">
                                <a aria-label="google-playstore" href="https://play.google.com/store/apps/details?id=com.houzeo.houzeo" target="_blank" tabindex="-1">
                                    <img width="111" height="33" src="https://dtpwvruv8ddnl.cloudfront.net/home-page-static-assets/google-play-btn.webp" alt="google-playstore" loading="lazy">
                                </a>
                                <a aria-label="apple-store" href="https://apps.apple.com/app/id1576836461" target="_blank" tabindex="-1">
                                    <img width="114" height="33" src="https://dtpwvruv8ddnl.cloudfront.net/home-page-static-assets/ios-store-btn.webp" alt="apple-store" loading="lazy">
                                </a>
                            </div>
                        </div>
                        <div class="cmnSubscribeWIthSocailMediaBox">
                            <ul class="cmnfooter-soc-link">
                                <li>
                                    <a class="twitter" aria-label="twitter" target="_blank" href="https://twitter.com/houzeo">
                                        
                                        <img src="https://dtpwvruv8ddnl.cloudfront.net/images/hfs-revamp/new-twitter.webp" loading="lazy" alt="twitter" height="24px" width="24px" />
                                    </a>
                                </li>
                                <li>
                                    <a class="linkedin" aria-label="linkedin" target="_blank" href="https://www.linkedin.com/company/houzeo">
                                        
                                        <img src="https://dtpwvruv8ddnl.cloudfront.net/images/hfs-revamp/new-linkedin.webp" loading="lazy" alt="linkedin" height="24px" width="24px" />
                                    </a>
                                </li>
                                <li>
                                    <a class="facebook" aria-label="facebook" target="_blank" href="https://www.facebook.com/houzeo">
                                        
                                        <img src="https://dtpwvruv8ddnl.cloudfront.net/images/hfs-revamp/new-facebook.webp" loading="lazy" alt="facebook" height="24px" width="24px" />
                                    </a>
                                </li>
                                <li>
                                    <a class="instagram" aria-label="instagram" target="_blank" href="https://www.instagram.com/houzeo">
                                        
                                        <img src="https://dtpwvruv8ddnl.cloudfront.net/images/hfs-revamp/new-instagram.webp" loading="lazy" alt="instagram" height="24px" width="24px" />
                                    </a>
                                </li>
                                <li>
                                    <a class="youtube" aria-label="youtube" target="_blank" href="https://www.youtube.com/channel/UCl5c3Y1e52hcpqZBBVh_zlQ/videos">
                                        <img src="https://dtpwvruv8ddnl.cloudfront.net/images/hfs-revamp/youtube.webp" loading="lazy" alt="Youtube" height="24px" width="32px" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <p class="houzeoCorpStyle"> Houzeo Corp. holds real estate brokerage licenses in Alabama (License No. 000157023 - 0) and Texas (License No. 9013396)</p>
            <p class="cmn_trec_info_text_wrap">
                TREC: <a href="https://dtpwvruv8ddnl.cloudfront.net/uploads/Information-About-Brokerage-Services.pdf" target="_blank">Info About Brokerage Services</a>, <a href="https://www.trec.texas.gov/forms/consumer-protection-notice" target="_blank">Consumer Protection Notice</a>.
            </p>

            <div class="text-center commonFootLogo">
                <div class="commonLogoWithTitle">
                    <a href="https://houzeo.com"><img src="https://dtpwvruv8ddnl.cloudfront.net/images/flat-fee-mls/new-logo.svg" class="ui centered small image margin-bottom lazy" alt="houzeo" width="150" height="45" loading="lazy"></a>
                    <p class="no-mar-bot">MAKING HOME BUYING AND SELLING EASY!</p>
                </div>
                <div class="commonLogoWithText">
                    <p>Copyright ©2025 Houzeo Corp. All rights reserved.</p>
                </div>
            </div>


        </div>
    </div>
</template>

<script>
export default {
    props: ['baseUrl'],
    data() {
        return {
            showAdditionalContent1: false,
            showAdditionalContent2: false,
            showAdditionalContent3: false
        }
    },

    methods: {
        toggleAdditionalContent1() {
            this.showAdditionalContent1 = !this.showAdditionalContent1;
        },
        toggleAdditionalContent2() {
            this.showAdditionalContent2 = !this.showAdditionalContent2;
        },
        toggleAdditionalContent3() {
            this.showAdditionalContent3 = !this.showAdditionalContent3;
        }
    }
}
</script>

<style lang="scss" scoped>
@use '../assets/styles/footer.scss'
</style>