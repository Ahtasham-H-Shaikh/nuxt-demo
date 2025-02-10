<template>
    <div class="CocSectionWrapper cocMortgageBox">
        <h2 class="cocTitle">Calculate Your Monthly Mortgage Payment</h2>
        <div class="mortgageBoxes">
            <div class="leftBoxMortgage">
                <div class="leftMortgageForm" ref="leftMortgageForm">
                    <form class="affordForm" action="">
                        <div class="annualWrap">
                            <div class="leftInptAnnual leftPrice">
                                <div class="annualTooltip">
                                    <label class="annualLabel">Home Price</label>
                                </div>
                                <div class="affordLeftInpt">
                                    <p class="lftPara">$</p>
                                    <input
                                        type="text"
                                        @mouseover="showBorder"
                                        @mouseout="hideBorder"
                                        @click="hideBorder"
                                        class="affordInptAnnual"
                                        @focus="handleFocus($event)"
                                        @blur="handleBlur()"
                                        @input="updateHomePriceRange"
                                        oninput="this.value = new Intl.NumberFormat('en-US').format( this.value.replace(/[^0-9]/g, '').slice(0, 7) );"
                                        ref="homePriceInput"
                                        placeholder="Annual Income"
                                        v-model.number="homePrice"
                                    />
                                    <div class="affordBorder"></div>
                                </div>
                            </div>
                            <div class="annualSliderRange">
                                <input type="range" @focus="addClass" @click="hideBorder" @mousedown="addClass" v-model.number="homePriceRange" @input="updateHomePriceInput" min="0" :max="this.getFieldValue(this.defaultData, 'home_price', 'max_val')" step="25000" class="progress progress1" :style="{ background: homePriceSliderStyle }" />
                                <div class="inpurperCent">
                                    <span class="dataValue">${{ this.getFieldValue(this.defaultData, "home_price", "min_val") | formatNumber }}</span>
                                    <span class="dataValue">${{ this.getFieldValue(this.defaultData, "home_price", "max_val") | formatNumber }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="annualWrap">
                            <div class="leftInptAnnual leftDownPay leftPrice">
                                <div class="annualTooltip">
                                    <label class="annualLabel">Down Payment</label>
                                    <div class="tooltip downTootltip">
                                        <img loading="lazy" src="https://dtpwvruv8ddnl.cloudfront.net/images/mortgage-calculator/tool-tip-info.svg" alt="Tooltip" />
                                        <span class="tooltiptext">An insurance policy to protect your home and things in it against any damage.</span>
                                    </div>
                                </div>
                                <div class="affordLeftInpt">
                                    <p class="lftPara">$</p>
                                    <input
                                        type="text"
                                        class="affordInptAnnual"
                                        @mouseover="showBorder"
                                        @mouseout="hideBorder"
                                        @click="hideBorder"
                                        @focus="handleFocus($event)"
                                        @blur="handleBlur()"
                                        ref="downPaymentPrice"
                                        placeholder="Down Payment"
                                        name="payment"
                                        v-model.number="downPayment"
                                        @input="updateDownPaymentInput"
                                        oninput="this.value = new Intl.NumberFormat('en-US').format( this.value.replace(/[^0-9]/g, '').slice(0, 7) );"
                                    />
                                    <p class="rghtPara">{{ this.downPaymentRange }}%</p>
                                </div>
                            </div>
                            <div class="annualSliderRange">
                                <input type="range" @focus="addClass1" @mousedown="addClass1" v-model.number="downPaymentRange" @input="updateDownPaymentRange" min="0" :max="this.getFieldValue(this.defaultData, 'down_payment', 'max_val')" step="1" class="progress progress2" :style="downPaymentSliderStyle" />
                                <div class="inpurperCent">
                                    <span class="dataValue">{{ this.getFieldValue(this.defaultData, "down_payment", "min_val") }}%</span>
                                    <span class="dataValue">{{ this.getFieldValue(this.defaultData, "down_payment", "max_val") }}%</span>
                                </div>
                            </div>
                        </div>

                        <div class="annualWrap">
                            <div class="leftInptAnnual leftPrice">
                                <div class="annualTooltip">
                                    <label class="annualLabel mortgageLabel">Mortgage Interest Rate</label>
                                    <div class="tooltip mortTootltip">
                                        <img loading="lazy" src="https://dtpwvruv8ddnl.cloudfront.net/images/mortgage-calculator/tool-tip-info.svg" alt="Tooltip" />
                                        <span class="tooltiptext">An insurance policy to protect your home and things in it against any damage.</span>
                                    </div>
                                </div>
                                <div class="affordLeftInpt">
                                    <p class="lftPara">%</p>
                                    <input
                                        type="text"
                                        class="affordInptAnnual"
                                        @mouseover="showBorder"
                                        @mouseout="hideBorder"
                                        @click="hideBorder"
                                        v-model="interestRate"
                                        @focus="handleFocus($event)"
                                        ref="interestRateInput"
                                        oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1').slice(0, 5);"
                                        @blur="handleBlur()"
                                        placeholder="Mortgage Interest Rate"
                                        name="income"
                                    />
                                </div>
                            </div>
                            <div class="annualSliderRange">
                                <input type="range" min="0" :max="this.getFieldValue(this.defaultData, 'mortgage_interest_rate', 'max_val')" step="1" v-model="interestRange" class="progress progress3" :style="mortgageIntRateSliderStyle" />
                                <div class="inpurperCent">
                                    <span class="dataValue">{{ this.getFieldValue(this.defaultData, "mortgage_interest_rate", "min_val") }}%</span>
                                    <span class="dataValue">{{ this.getFieldValue(this.defaultData, "mortgage_interest_rate", "max_val") }}%</span>
                                </div>
                            </div>
                        </div>

                        <div class="leftInptAnnual leftPrice leftloanPrice">
                            <div class="annualTooltip">
                                <label class="annualLabel">Loan Term</label>
                                <div class="tooltip loanTooltip">
                                    <img loading="lazy" src="https://dtpwvruv8ddnl.cloudfront.net/images/mortgage-calculator/tool-tip-info.svg" alt="Tooltip" />
                                    <span class="tooltiptext">An insurance policy to protect your home and things in it against any damage.</span>
                                </div>
                            </div>
                            <div class="affordLeftInpt">
                                <select class="affordLeftSlct" name="loan" id="loan" v-model="loanTerm">
                                    <option value="30" selected>30 Years</option>
                                    <option value="25">25 Years</option>
                                    <option value="20">20 Years</option>
                                    <option value="15">15 Years</option>
                                    <option value="10">10 Years</option>
                                </select>
                            </div>
                        </div>
                    </form>
                    <span class="addborderDiv" ref="borderDiv"></span>
                    <div class="optionalMonth" @click="refreshMortgageChart">
                        <span class="optionalText">Optional Costs Per Month <span class="spanArrow"> </span> </span>
                    </div>
                </div>
            </div>

            <div class="rightBoxMortgage">
                <div class="breakDownBlock">
                    <h2 class="cocMortgagePayTitle">Estimated Monthly Payment*</h2>
                    <div class="breakBlock">
                        <div class="breakBlockPart">
                            <div class="breakInBlock">
                                <div class="breakblockDiv">
                                    <div class="chartContainer" ref="mychartContainer">
                                        <canvas id="myChart" width="450" height="250"></canvas>
                                        <div class="chartContent">
                                            <span class="paymentDollar">${{ this.toCurrency(this.monthlyMortgage) }}</span>
                                            <span class="dollarPreApproved checkpreApproval" @click="handleCLickPreApprovalIfram('5', false, '')">Get Pre-approved</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="breakblockDiv">
                                    <ul class="breakBlockList">
                                        <li>
                                            <div class="breaktext">
                                                <span class="breakBg breakBlue"></span>
                                                <span class="breakInText">Principal & Interest</span>
                                            </div>
                                            <div class="breakDollarValue">
                                                <span class="breakDollarText"><span>$</span>{{ toCurrency(pni) }}</span>
                                            </div>
                                        </li>
                                        <template v-for="(item, index) in paymentList">
                                            <li :key="item.id" v-if="!(item.label === 'PMI' && downPaymentRange > 19)">
                                                <div class="breaktext">
                                                    <span :class="['breakBg', item.color]"></span>
                                                    <span class="breakInText">{{ item.label }}</span>
                                                </div>
                                                <div class="breakDollarValue" :class="{ active: activeIndex === index }">
                                                    <div class="breakTextBox">
                                                        <span class="dollarAction dollarMinus" @click="updateValue(index, -1)">
                                                            <img loading="lazy" src="https://dtpwvruv8ddnl.cloudfront.net/images/mortgage-calculator/minus-grey.svg" class="inc1" alt="minus" />
                                                            <img loading="lazy" src="https://dtpwvruv8ddnl.cloudfront.net/images/mortgage-calculator/minus-blue.svg" class="inc2" alt="minus" />
                                                        </span>
                                                        <div class="dollarInputBox">
                                                            <span class="dollarText">$</span>
                                                            <input type="text" v-model="item.value" class="rangeValue" @input="assignValue(index, $event)" oninput="this.value = this.value.replace(/[^0-9]/g, '').slice(0, 5);" />
                                                        </div>
                                                        <span class="dollarAction dollarPlus" @click="updateValue(index, 1)">
                                                            <img loading="lazy" src="https://dtpwvruv8ddnl.cloudfront.net/images/mortgage-calculator/plus-grey.svg" class="inc1" alt="plus" />
                                                            <img loading="lazy" src="https://dtpwvruv8ddnl.cloudfront.net/images/mortgage-calculator/plus-blue.svg" class="inc2" alt="plus" />
                                                        </span>
                                                    </div>
                                                    <div class="breakActive"></div>
                                                </div>
                                            </li>
                                        </template>
                                    </ul>
                                    <!-- ==================================================================================== -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { toRaw } from "vue";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from "chart.js";
Chart.register(DoughnutController, ArcElement, Tooltip, Legend, ChartDataLabels);
export default {
    data() {
        return {
            homePrice: 0,
            homePriceRange: 0,
            downPayment: 0,
            downPaymentRange: 0,
            interestRate: 5,
            interestRange: 40,
            loanTerm: 30,
            monthlyMortgage: 0,
            paymentList: [
                { label: "Property Tax", color: "breakTill", value: 280 },
                { label: "Homeowner's Insurance", color: "breakYellow", value: 66 },
                { label: "PMI", color: "breakGreen", value: 100 },
                { label: "HOA Fees", color: "breakOrange", value: 5 }
            ],
            activeIndex: null,
            newHomePrice: 0,
            newDownPayment: 0,
            pni: 0,
            newPaymentList: [{ value: 280 }, { value: 66 }, { value: 100 }, { value: 5 }],
            downPaymentCalculatedPercent: 0,
            pt: 0,
            newPt: 0,
            hi: 0,
            newHi: 0,
            pmi: 0,
            newPmi: 0,
            hoa: 0,
            newHoa: 0
        };
    },
    props: ['defaultData'],
    beforeMount() {
        this.setDefaults();
    },
    mounted() {
        this.mortgageChart();
        this.setupIntersectionObserver();
    },
    methods: {
        getFieldValue(data, fieldName, expectedVal) {
            for (let item of data) {
                if (item.field_name == fieldName) {
                    return item[expectedVal];
                }
            }
            return null;
        },
        setDefaults() {
            console.log('triggered')
            this.homePrice = this.commaFormatting(this.getFieldValue(this.defaultData, "home_price", "default_val"));
            this.newHomePrice = this.getFieldValue(this.defaultData, "home_price", "default_val");
            this.homePriceRange = this.getFieldValue(this.defaultData, "home_price", "default_val");
            this.downPaymentRange = this.getFieldValue(this.defaultData, "down_payment", "default_val");
            this.downPayment = this.commaFormatting(Math.round((this.downPaymentRange / 100) * this.newHomePrice));
            this.newDownPayment = Math.round((this.downPaymentRange / 100) * this.newHomePrice);
            this.interestRate = this.getFieldValue(this.defaultData, "mortgage_interest_rate", "default_val");
            this.interestRange = this.interestRate;
            this.loanTerm = this.getFieldValue(this.defaultData, "loan_term", "default_val");

            this.paymentList[0].value = this.pt = this.commaFormatting(this.getFieldValue(this.defaultData, "property_tax", "default_val"));
            this.newPaymentList[0].value = this.newPt = this.getFieldValue(this.defaultData, "property_tax", "default_val");
            this.paymentList[1].value = this.hi = this.commaFormatting(this.getFieldValue(this.defaultData, "homeowner_insurance", "default_val"));
            this.newPaymentList[1].value = this.newHi = this.getFieldValue(this.defaultData, "homeowner_insurance", "default_val");
            this.paymentList[2].value = this.pmi = this.commaFormatting(this.getFieldValue(this.defaultData, "pmi", "default_val"));
            this.newPaymentList[2].value = this.newPmi = this.getFieldValue(this.defaultData, "pmi", "default_val");
            this.paymentList[3].value = this.hoa = this.commaFormatting(this.getFieldValue(this.defaultData, "hoa_fees", "default_val"));
            this.newPaymentList[3].value = this.newHoa = this.getFieldValue(this.defaultData, "hoa_fees", "default_val");
        },
        setupIntersectionObserver() {
            const observer = new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting && !this.hasAnimated) {
                            this.canvasVisible = false;
                            this.mortgageChart();
                            this.hasAnimated = true;
                            observer.unobserve(entry.target);
                        }
                    });
                },
                {
                    threshold: 0.5 // Trigger when 50% of the element is visible
                }
            );

            observer.observe(this.$refs.mychartContainer); // Observe the chart container element
        },
        showBorder(event) {
            const inputElement = event.target;
            const parentElement = inputElement.closest(".affordLeftInpt");
            const borderDiv = this.$refs.borderDiv;
            const formContainer = this.$refs.leftMortgageForm;

            if (parentElement && formContainer && document.activeElement !== inputElement) {
                const parentRect = parentElement.getBoundingClientRect();
                const formRect = formContainer.getBoundingClientRect();
                const offsetTop = parentRect.top - formRect.top;
                const offsetLeft = parentRect.left - formRect.left;
                borderDiv.style.width = `${parentRect.width}px`;
                borderDiv.style.height = `${parentRect.height}px`;
                borderDiv.style.top = `${offsetTop}px`;
                borderDiv.style.left = `${offsetLeft}px`;
                borderDiv.style.opacity = "1";
                borderDiv.style.zIndex = 1;
            }
        },
        hideBorder() {
            const borderDiv = this.$refs.borderDiv;
            borderDiv.style.opacity = "0";
            borderDiv.style.zIndex = -1;
        },
        handleFocus(event) {
            const borderDiv = this.$refs.borderDiv;
            borderDiv.style.opacity = "0";
            borderDiv.style.zIndex = -1;
            const allParents = document.querySelectorAll(".affordLeftInpt");
            allParents.forEach((parent) => {
                parent.classList.remove("active");
            });
            const allProgress = document.querySelectorAll(".progress");
            allProgress.forEach((progress) => {
                progress.classList.remove("active");
            });
            const parent = event.target.closest(".leftInptAnnual").querySelector(".affordLeftInpt");
            if (parent) {
                parent.classList.add("active");
            }
            const range = event.target.closest(".leftInptAnnual").nextElementSibling.querySelector(".progress");
            if (range) {
                range.classList.add("active");
            }
            this.isActive = true;
        },

        handleBlur() {
            const allParents = document.querySelectorAll(".affordLeftInpt");
            allParents.forEach((parent) => {
                parent.classList.remove("active");
            });
            const allProgress = document.querySelectorAll(".progress");
            allProgress.forEach((progress) => {
                progress.classList.remove("active");
            });
            const borderDiv = this.$refs.borderDiv;
            borderDiv.style.opacity = "0";
            borderDiv.style.zIndex = -1;
            this.isActive = false;
        },
        updateHomePriceRange(event) {
            let inputValue = event.target.value;

            this.newHomePrice = Number(inputValue.replaceAll(",", ""));
            this.homePrice = this.commaFormatting(inputValue);
            if (this.newHomePrice < 0) {
                this.newHomePrice = 0;
                this.homePrice = 0;
            } else if (this.newHomePrice > this.getFieldValue(this.defaultData, "home_price", "max_val")) {
                this.newHomePrice = this.getFieldValue(this.defaultData, "home_price", "max_val");
                this.homePrice = this.commaFormatting(this.getFieldValue(this.defaultData, "home_price", "max_val"));
            }
            this.homePriceRange = this.newHomePrice;
            this.newDownPayment = Math.round((this.downPaymentRange / 100) * this.newHomePrice);
            this.downPayment = this.commaFormatting(this.newDownPayment);
            if (this.downPaymentRange < 20) this.calculatePMI();

            this.calculateMortgage();
        },

        updateHomePriceInput() {
            this.newHomePrice = this.homePriceRange;
            this.homePrice = this.commaFormatting(this.homePriceRange);
            this.newDownPayment = Math.round((this.downPaymentRange / 100) * this.newHomePrice);
            this.downPayment = this.commaFormatting(this.newDownPayment);
            this.$refs.homePriceInput.focus();
            if (this.downPaymentRange < 20) this.calculatePMI();

            this.calculateMortgage();
        },
        addClass(event) {
            event.target.classList.add("active");
            document.addEventListener("click", this.handleClickOutside);
        },
        addClass1(event) {
            event.target.classList.add("active");
            document.addEventListener("click", this.handleClickOutside);
        },
        updateDownPaymentInput(event) {
            let inputValue = event.target.value;

            this.newDownPayment = Number(inputValue.replaceAll(",", ""));
            this.downPayment = this.commaFormatting(inputValue);
            if (this.newDownPayment > Math.round((70 / 100) * this.newHomePrice)) {
                this.newDownPayment = Math.round((this.downPaymentRange / 100) * this.newHomePrice);
                this.downPayment = this.commaFormatting(this.newDownPayment);
            }
            if (this.newDownPayment < 0) {
                this.newDownPayment = 0;
                this.downPayment = 0;
            } else if (this.newDownPayment > this.getFieldValue(this.defaultData, "home_price", "max_val")) {
                this.newDownPayment = (this.getFieldValue(this.defaultData, "home_price", "max_val") / 100) * this.newHomePrice;
                this.downPayment = this.commaFormatting((this.getFieldValue(this.defaultData, "home_price", "max_val") / 100) * this.newHomePrice);
            }
            this.downPaymentRange = Math.round((this.newDownPayment / this.newHomePrice) * 100);

            if (this.downPaymentRange < 20) this.calculatePMI();

            this.calculateMortgage();
        },
        updateDownPaymentRange() {
            this.newDownPayment = Math.round((this.downPaymentRange / 100) * this.newHomePrice);
            this.downPayment = this.commaFormatting(this.newDownPayment);
            this.$refs.downPaymentPrice.focus();
            if (this.downPaymentRange < 20) this.calculatePMI();

            this.calculateMortgage();
        },
        refreshMortgageChart() {
            let oldValArr = {
                newPmi: this.newPmi,
                newPt: this.newPt,
                newHi: this.newHi,
                newHoa: this.newHoa,
                pni: this.pni
            };

            this.newPmi = 1;
            this.newPt = 1;
            this.newHi = 1;
            this.newHoa = 1;
            this.pni = 1;

            this.chartinstance.data.labels = this.labelsArray;
            this.chartinstance.data.datasets[0].data = this.dataArray;
            this.chartinstance.data.datasets[0].backgroundColor = this.colorsArray;
            this.chartinstance.data.datasets[0].borderColor = this.colorsArray;
            this.chartinstance.update();
            this.mortgageChart();

            setTimeout(() => {
                this.newPmi = oldValArr["newPmi"];
                this.newPt = oldValArr["newPt"];
                this.newHi = oldValArr["newHi"];
                this.newHoa = oldValArr["newHoa"];
                this.pni = oldValArr["pni"];
                this.chartinstance.data.labels = this.labelsArray;
                this.chartinstance.data.datasets[0].data = this.dataArray;
                this.chartinstance.data.datasets[0].backgroundColor = this.colorsArray;
                this.chartinstance.data.datasets[0].borderColor = this.colorsArray;
                this.chartinstance.update();
                this.mortgageChart();
            }, 250);
        },
        toCurrency(rawValue) {
            if (typeof rawValue !== "number") {
                return rawValue;
            }
            var formatter = new Intl.NumberFormat("en-US", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            });
            return formatter.format(rawValue);
        },
        handleCLickPreApprovalIfram(val, blogFlag, selectedLoanType) {
            window.handleCLickPreApprovalIfram(val, blogFlag, selectedLoanType);
        },
        updateValue(index, delta) {
            const newValue = parseInt(String(this.paymentList[index].value).replaceAll(",", "")) + delta;
            if (newValue >= 0) {
                if (index == 0) {
                    this.pt = this.commaFormatting(newValue);
                    this.newPt = newValue;
                } else if (index == 1) {
                    this.hi = this.commaFormatting(newValue);
                    this.newHi = newValue;
                } else if (index == 2) {
                    this.pmi = this.commaFormatting(newValue);
                    this.newPmi = newValue;
                } else if (index == 3) {
                    this.hoa = this.commaFormatting(newValue);
                    this.newHoa = newValue;
                }
                this.paymentList[index].value = this.commaFormatting(newValue);
                this.newPaymentList[index].value = newValue;
                this.activeIndex = index;
            }
            this.calculateMortgage();
        },
        assignValue(index, event) {
            let newValue = event.target.value;
            if (event.data == null || (!isNaN(event.data) && /^\d+$/.test(event.data))) {
                if (newValue >= 0) {
                    if (index == 0) {
                        this.pt = this.commaFormatting(newValue);
                        this.newPt = String(newValue).replaceAll(",", "");
                    } else if (index == 1) {
                        this.hi = this.commaFormatting(newValue);
                        this.newHi = String(newValue).replaceAll(",", "");
                    } else if (index == 2) {
                        this.pmi = this.commaFormatting(newValue);
                        this.newPmi = String(newValue).replaceAll(",", "");
                    } else if (index == 3) {
                        this.hoa = this.commaFormatting(newValue);
                        this.newHoa = String(newValue).replaceAll(",", "");
                    }
                    this.paymentList[index].value = this.commaFormatting(newValue);
                    this.newPaymentList[index].value = String(newValue).replaceAll(",", "");
                    this.activeIndex = index;
                }
                this.calculateMortgage();
            }
        },
        calculatePMI() {
            let principalAmount = this.newHomePrice - this.newDownPayment;
            if (this.downPaymentRange < 5) {
                this.pmi = this.paymentList[2].value = Math.round(principalAmount * (0.0817 / 100));
            } else if (this.downPaymentRange > 4 && this.downPaymentRange < 10) {
                this.pmi = this.paymentList[2].value = Math.round(principalAmount * (0.0634 / 100));
            } else if (this.downPaymentRange > 9 && this.downPaymentRange < 15) {
                this.pmi = this.paymentList[2].value = Math.round(principalAmount * (0.0492 / 100));
            } else if (this.downPaymentRange > 14 && this.downPaymentRange < 20) {
                this.pmi = this.paymentList[2].value = Math.round(principalAmount * (0.0367 / 100));
            }
            this.calculateMortgage();
        },
        calculateMortgage() {
            if (this.newHomePrice > 0 && this.interestRate > 0) {
                let principalAmt = this.newHomePrice - this.newDownPayment;
                let monthlyInterestRate = this.interestRate / 100 / 12;
                let numberOfPayments = this.loanTerm * 12;

                this.pni = Math.round(principalAmt * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
                let privatemi = this.downPaymentRange < 20 ? parseInt(this.pmi) : 0;
                this.monthlyMortgage = Math.round(parseInt(this.pni) + parseInt(this.newPt) + parseInt(this.newHi) + privatemi + parseInt(this.newHoa));

                this.mortgageChart();
            }
        },
        handleClickOutside(event) {
            if (!event.target.closest(".annualWrap")) {
                this.removeClass();
            }
        },
        removeClass() {
            const sliders = document.querySelectorAll(".progress");
            sliders.forEach((slider) => {
                slider.classList.remove("active");
            });
            document.removeEventListener("click", this.handleClickOutside);
        },
        mortgageChart() {
            if (this.downPaymentRange < 20) {
                this.labelsArray = ["PMI", "Property Tax", "Homeowner's Insurance", "HOA Fees", "Principal & Interest"];
                this.dataArray = [Math.round(this.newPmi), Math.round(this.newPt), Math.round(this.newHi), Math.round(this.newHoa), Math.round(this.pni)];
                this.colorsArray = ["#27AE60", "#14B8A6", "#FACC15", "#F2711C", "#0B5AA5"];
            } else {
                this.labelsArray = ["Property Tax", "Homeowner's Insurance", "HOA Fees", "Principal & Interest"];
                this.dataArray = [Math.round(this.newPt), Math.round(this.newHi), Math.round(this.newHoa), Math.round(this.pni)];
                this.colorsArray = ["#14B8A6", "#FACC15", "#F2711C", "#0B5AA5"];
            }
            const ctx = document.getElementById("myChart").getContext("2d");
            if (!this.chartinstance) {
                this.chartinstance = new Chart(ctx, {
                    type: "doughnut",
                    data: {
                        labels: this.labelsArray,
                        datasets: [
                            {
                                data: this.dataArray,
                                borderColor: this.colorsArray,
                                backgroundColor: this.colorsArray,
                                borderWidth: 1
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        cutout: "80%",
                        maintainAspectRatio: true,
                        plugins: {
                            tooltip: {
                                enabled: true,
                                callbacks: {
                                    label: function (tooltipItem) {
                                        const value = tooltipItem.raw;
                                        return "$" + new Intl.NumberFormat("en-US").format(value);
                                    }
                                }
                            },
                            legend: {
                                display: false
                            },
                            datalabels: {
                                display: false
                            }
                        }
                    }
                });
            } else {
                this.chartinstance.data.labels = this.labelsArray;
                this.chartinstance.data.datasets[0].data = this.dataArray;
                this.chartinstance.data.datasets[0].backgroundColor = this.colorsArray;
                this.chartinstance.data.datasets[0].borderColor = this.colorsArray;
                this.chartinstance.update();
            }
        },
        commaFormatting(value) {
            return new Intl.NumberFormat("en-US").format(Number(String(value).replaceAll(",", "")));
        }
    },
    computed: {
        homePriceSliderStyle() {
            let percentage = (this.homePriceRange / this.getFieldValue(this.defaultData, "home_price", "max_val")) * 100;
            return `linear-gradient(to right, #0B5AA5 ${percentage}%, rgba(0, 0, 0, 0) ${percentage}%)`;
        },
        downPaymentSliderStyle() {
            let dpPercentage = (this.downPaymentRange / this.getFieldValue(this.defaultData, "down_payment", "max_val")) * 100;
            return `background: linear-gradient(to right, #0B5AA5 ${dpPercentage}%, rgba(0, 0, 0, 0) ${dpPercentage}%)`;
        },
        mortgageIntRateSliderStyle() {
            let percentage = this.interestRange;
            return `background: linear-gradient(to right, #0B5AA5 0%, #0B5AA5 ${percentage * 6.65}%, rgba(0,0,0,0) ${percentage * 6.65}%, rgba(0,0,0,0) 100%)`;
        }
    },
    watch: {
        interestRate(newValue) {
            let value = String(newValue)
                .replace(/[^0-9.]/g, "")
                .replace(/(\..*?)\..*/g, "$1")
                .slice(0, 5);

            this.interestRate = value;
            if (value < 0) {
                this.interestRange = 0;
            } else if (value > 15) {
                this.interestRange = 15;
            } else {
                this.interestRange = value;
            }
            this.calculateMortgage();
        },
        interestRange(newValue) {
            this.interestRate = newValue;
            this.calculateMortgage();
        },
        pt(newValue) {
            this.pt = this.paymentList[0].value = this.commaFormatting(newValue);
            this.newPt = this.newPaymentList[0].value = String(newValue).replaceAll(",", "");
            this.calculateMortgage();
        },
        hi(newValue) {
            this.hi = this.paymentList[1].value = this.commaFormatting(newValue);
            this.newHi = this.newPaymentList[1].value = String(newValue).replaceAll(",", "");
            this.calculateMortgage();
        },
        pmi(newValue) {
            this.pmi = this.paymentList[2].value = this.commaFormatting(newValue);
            this.newPmi = this.newPaymentList[2].value = String(newValue).replaceAll(",", "");
            this.calculateMortgage();
        },
        hoa(newValue) {
            this.hoa = this.paymentList[3].value = this.commaFormatting(newValue);
            this.newHoa = this.newPaymentList[3].value = String(newValue).replaceAll(",", "");
            this.calculateMortgage();
        },
        loanTerm(newValue) {
            this.calculateMortgage();
        }
    },
    filters: {
        formatNumber(value) {
            if (value === null || value === undefined) return "";

            const units = ["K", "M", "B", "T"];
            const threshold = 1000;

            if (value < threshold) return value;

            let unitIndex = -1;
            do {
                value /= threshold;
                unitIndex++;
            } while (value >= threshold && unitIndex < units.length - 1);

            return value + units[unitIndex];
        }
    }
};
</script>
