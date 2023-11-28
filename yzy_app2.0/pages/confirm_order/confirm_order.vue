<template>
	<view class="confirm-order">
		<view class="address-card card-shadow" @click="showAddFrame()">
			<view class="address-info">
				<view class="address-details">
					{{ selectedAddress.city }}
				</view>
				<view class="address-details-road">{{ selectedAddress.address }}</view>
				<view class="address-name-phone">
					<view class="address-name">{{ selectedAddress.name }}</view>
					<view class="address-phone">{{ selectedAddress.phone }}</view>
				</view>
			</view>
			<view>
				<image class="more-location-icon" src="../../static/icon/more_person.svg"></image>
			</view>
		</view>
		<view class="order-list card-shadow">
			<view class="order-item" v-for="items in shops" :key="items.id">
				<view class="item-list">
					<view class="shop-title" @click="goToShop(items)">
						<image src="/static/tabbar/home-active.png" style="width: 16px;height: 16px;"></image>
						<view class="shop-name">{{ items.simplifyShopName }}</view>
					</view>
					<view class="item" v-for="item in items.drugs" :key="item.id">
						<view class="item-info">
							<image
								@click="showImg(item.imgLszh ? 'http://images.yndzyf.com/getimage.ashx?mlszh=' + item.imgLszh : defaultPic)"
								:src="item.imgLszh ? 'http://images.yndzyf.com/getimage.ashx?mlszh=' + item.imgLszh : defaultPic"
								mode="">
							</image>
							<view class="item-details">
								<view class="item-name">{{ item.drugName }}</view>
								<view class="item-spec">{{ item.specification +'/'+item.sellUnit}}</view>
								<!-- <view class="item-spec">{{ item.specification }}</view> -->
								<view class="item-manu">{{ item.manufacturer }}</view>
							</view>
							<view class="item-detail-right">
								<view class="item-quantity">x{{ item.num }}</view>
								<view class="item-price">￥{{ item.price }}</view>
								<view v-if="item.healthInsuranceFlag=='y'" class="yb-tag">
									<text>可线上医保</text>
								</view>
							</view>
						</view>
					</view>
					<view class="form-container">
						<view class="form-item">
							<view class="label">
								<text class="label-word">商品数量：</text>
							</view>
							<view class="value">{{'共 ' + totalNum + ' 件'}}</view>
						</view>
						<view class="line"></view>
					</view>
				</view>
			</view>
		</view>
		<view class="shipping-fee-card card-shadow" v-if="selectPayValue=='微信医保支付'">
			<view class="select-person-firstline">
				<view class="select-person-title">
					<text class="uni-title uni-common-pl memo">选择用药人：</text>
				</view>
				<view class="more-person" @click="checkPerson()" style="font-size: 0.24rem;">
					<view class="f-color">新增/编辑</view>
					<image class="more-person-icon" src="../../static/icon/more_person.svg" style="    width: 15px;height: 15px;"></image>
				</view>
			</view>
			<view class="uni-flex uni-row person-row">
				<view class="flex-item person-item" v-for="(person, index) in persons" :key="index" v-if="(selectPayValue=='微信医保支付')?person.relationship=='本人':true"
					:class="index === selectPersonIndex ? 'persong-item-selected' : 'person-item'"
					@click="selectPersonIndex = index; selectPersonId = person.id">
					<view class="person-name">{{person.goodsUserName}}
					<text style="color: red;font-size: 12px;;font-weight: 100;" v-if="person.relationship=='本人'">{{'('+person.relationship+')'}}</text>
					</view>
					<text class="person-info">{{person.sex}}</text>
					<text class="person-info person-age" v-text="calculateAge(person.birthday)+'岁'"></text>
					<text class="person-info" style="display: none;">{{person.id}}</text>
				</view>
			</view>
			
		</view>
		<view class="shipping-fee-card card-shadow">
			<view class="shipping-fee-title" style="display: flex; align-items: center;">
				<view class="uni-title uni-common-pl memo">支付方式：</view>
				<uni-data-select
					v-model="selectPayValue"
					:localdata="selectPayRange"
					:clear="false"
					class="shipping-select"
					
				></uni-data-select>
				
			</view>
			<view style="padding-left: 11px;">
				<text style="color: crimson;    font-size: 24rpx;" v-if="MedicarePaymentFlag">推荐选择医保支付</text>
				<text style="color: crimson;    font-size: 24rpx;" v-if="!MedicarePaymentFlag">提交订单商品存在不可线上医保支付的商品,仅支持微信支付</text>
			</view>
		</view>
		
		<view class="shipping-fee-card card-shadow">
			<view class="shipping-fee-title" style="display: flex; align-items: center;">
				<view class="uni-title uni-common-pl memo">配送方式：</view>
				<!-- 将其改造成直接点击选择的模式，而不是下拉框选择 -->
				<!-- <uni-data-select
					v-model="selectValue"
					:localdata="selectRange"
					:clear="false"
					class="shipping-select"
					@change="selectChanged"
				></uni-data-select> -->
				<view class="type-choose" @click="openSelectType()">
					<text :class="selectText === '请点击此处选择...' ? 'type-choose-text' : 'type-choosed-text' " >{{selectText}}</text>
					<uni-icons :type="showSelector ? 'top' : 'bottom'" size="14" color="#999" />
				</view>
			</view>
			<view class="item-list">
				<view class="form-container-shipping">
					<view class="form-item-caution" v-if="coldFlag === true">
						<view class="value" style=" color: red; font-weight: bold;">※冷链药品仅限药房自配或到店自取※</view>
					</view>
					<view class="form-item">
						<view class="label">
							<text class="label-word">距离：</text>
						</view>
						<view class="value">{{distance.toFixed(2) + ' km'}}</view>
					</view>
					<view class="line"></view>
					<view class="form-item">
						<view class="label">
							<text class="label-word">运费：</text>
						</view>
						<view class="value" style="color: red; font-weight: bold;">{{ '￥' + shippingFee.toFixed(2) }}</view>
					</view>
					<view class="line"></view>
					<view class="form-item">
						<view class="label">
							<text class="label-word">营业时间：</text>
						</view>
						<view class="value">{{businessHours}}</view>
					</view>
					<view class="line"></view>
					<view class="form-item" v-if="selectText !== '请点击此处选择...'">
						<view class="label">
							<text class="label-word">服务：</text>
						</view>
						<view class="value" style="display: flex; flex-wrap: wrap;">{{cautionText}}</view>
					</view>
					<view class="form-item-caution" v-if="selectText === '到店自取'">
						<view class="value" style=" color: #1296DB; font-weight: bold;">您可到店刷医保卡，已支付金额将原路返回</view>
					</view>
					<view class="line" v-if="selectText !== '请点击此处选择...'"></view>
				</view>
			</view>
		</view>
		<view class="memo-card card-shadow">
			<view class="uni-title uni-common-pl memo">订单备注：</view>
			<view class="uni-textarea">
				<textarea @blur="bindTextAreaBlur" placeholder="请在此处填写订单备注信息(选填)" />
			</view>
		</view>
		<view class="caution-card card-shadow">
			<view class="caution-title">订单中的药品不支持七天无理由退换</view>
			<view class="caution-content">依据GSP相关规定，药品一经售出，无质量问题不退不换。</view>
		</view>
		<view class="blank"></view>
		<view class="tabbar">
			<view>
				<checkbox-group name="read" class="checkbox-item" @change="checkboxChange()">
					<checkbox value="cb" color="#1296DB" :checked="checkboxSelected" />
					<text>阅读并同意</text>
					<text class="f-active-color" @click="openReadText()">《商品验收标准》</text>
					<text></text>
				</checkbox-group>
			</view>
			<view class="tabbar-commit">
				<view class="total-item">
					<view class="total-price">总计：</view>
					<text class="total-price-num">￥{{Number(totalPrice).toFixed(2)}}</text>
				</view>
				<!-- <view class="submit-btn" @tap="submitOrder" :disabled="!validSubmit">提交订单</view> -->
				<button class="submit-btn" @tap="submitOrder" :disabled="!validSubmit">提交订单</button>
			</view>
		</view>

		<!-- 用户地址选择的弹出层 -->
		<uni-popup ref="popup" type="center" :mask-click="isEnableClick" :animation="true">
			<selectUserLocation @fatherMethod="fatherMethods" ref="child"></selectUserLocation>
		</uni-popup>
		
		<!-- 配送方式选择的弹出层 -->
		<uni-popup ref="popupShipping" type="center" :mask-click="isEnableClick" :animation="true">
			<view class="popupShipping-panel" :style="'height: ' + selectRange.length * 255 + 'rpx;'">
				<view class="panel-item" v-for='item in selectRange' :key='item.value' @click="checkType(item)">
					<view class="panel-item-main">
						<view class="item-type-popup item-type-name">{{item.text}}</view>
						<view class="item-type-popup item-type-price">{{item.price}}</view>
					</view>
					<view class="panel-item-main" style="display: flex; align-items: flex-start; padding-left: 20rpx;">
						<view class="item-type-caution caution-caution">服务：</view>
						<view class="item-type-caution">{{item.caution}}</view>
					</view>
					<view class="form-item-caution" v-if="item.text === '到店自取'">
						<view class="value" style=" color: #1296DB; font-weight: bold;">您可到店刷医保卡，已支付金额将原路返回</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import request from '@/common/api/request.js'
	import requestZhyf from '@/common/api/requestZhyf.js'
	import selectUserLocation from '@/components/user/select_user_location.vue'
	export default {
		components: {
			selectUserLocation,
		},
		data() {
			return {
				validSubmit:true,//是否有效提交按钮
				selectValue: 0,
				selectRange: [{"value": 0, "text": "请选择", "price": 999, "caution": "无caution"}],
				selectPayValue:'微信支付',
				selectPayRange:[{"value": '微信支付', "text": "微信支付"}],
				shops: [],
				totalPrice: 0, // 总价
				selectedAddress: {
					name: '',
					phone: '',
					province: '',
					city: '',
					district: '',
					address: '请点击此处选择收货地址',
				},
				shippingFee: 0.00,
				distance: 0.00,
				checkboxSelected: false,
				totalNum: 0,
				list: [],
				selectedList: [],
				isEnableClick: true,
				popup: true,
				locationId: null,
				memo: '',
				realTimePricing: [],
				canNext: true,
				priceMatch: true,
				allMatch: true,
				defaultPic: 'http://images.yndzyf.com/getimage.ashx?mlszh=17700932',
				feeOrigin: [],
				selectText: '请点击此处选择...',
				cautionText: '',
				isShopping: null,
				businessHours: '',
				coldFlag: null,
				showSelector: false,
				MedicarePaymentFlag:false ,//是否可医保支付,
				persons:[],
				selectPersonId:null,
				selectPersonIndex:null,
			}
		},
		onShow() {
			this.getAddressList()
			this.getGoodsUser()
		},
		methods: {
			//支付方式切换
			checkPayTypeChange(){
				if(this.selectPayValue=='微信医保支付'){
					if(this.persons!=null||this.persons.length!=0){
						
						// 查找是否存在 relationship 为 "本人" 的对象
						const index = this.persons.findIndex(person => person.relationship === "本人");
						if (index !== -1) {
							// 如果找到了 "本人"，则设置索引和 ID
							this.selectPersonIndex = index;
							this.selectPersonId = this.persons[index].id;
						} else{
							this.selectPersonIndex = null;
							this.selectPersonId = null;
							uni.$showMsg("请选择'本人'作为用药人!",3000)
						}
					}
				}
			},
			//新增、编辑用药人
			checkPerson() {
				uni.navigateTo({
					url: '../goods_user/goods_user?openAddUser=true'
				});
			},
			//获取用药人
			async getGoodsUser() {
				const url = '/api/user/getGoodsUser';
				const method = 'POST';
				const data = {
					openid: uni.getStorageSync("user_id"),
					phone: uni.getStorageSync("phone")
				};
				try {
					const response = await request('yzy_app', url, method, data);
					console.log(response); //统一格式：{"data":{}, "flag":99, "result":"成功"}
					if (response.code == 99) {
						this.persons = response.data.data;
						if(this.persons!=null||this.persons.length!=0){
							//对this.persons中的对象进行排序，默认把“本人”放在最前面，如果有多个本人，则把最小id的本人放在最前
							this.persons.sort((a, b) => {
								if (a.relationship === '本人' && b.relationship !== '本人') {
									return -1;
								} else if (a.relationship !== '本人' && b.relationship === '本人') {
									return 1;
								} else if (a.relationship === '本人' && b.relationship === '本人') {
									return a.id - b.id;
								} else {
									return 0;
								}
							});
							// 查找是否存在 relationship 为 "本人" 的对象
							const index = this.persons.findIndex(person => person.relationship === "本人");
							if (index !== -1) {
								// 如果找到了 "本人"，则设置索引和 ID
								this.selectPersonIndex = index;
								this.selectPersonId = this.persons[index].id;
							} else if (this.persons.length > 0) {
								// 如果未找到 "本人"，但 persons 数组不为空，则默认选择第一个
								// this.selectPersonIndex = 0;
								// this.selectPersonId = this.persons[0].id;
							}
						}
						
						this.checkPayTypeChange()
						
					} else {
						uni.$showMsg(response.msg, 3000);
						
					}
				} catch (error) {
					uni.$showMsg(error, 3000);
					
				}
			},
			calculateAge(birthday) {
				const birthdayDate = new Date(
					birthday.substr(0, 4),
					birthday.substr(4, 2) - 1,
					birthday.substr(6, 2)
				);
			
				const currentDate = new Date();
				const ageInMillis = currentDate - birthdayDate;
			
				// 计算年龄
				const ageInYears = Math.floor(ageInMillis / (365 * 24 * 60 * 60 * 1000));
				return ageInYears;
			},
			//初始化配送方式
			turntypeToDefault(){
				this.cautionText = '';
				this.selectValue = 0;
				this.selectText = '请点击此处选择...';
				this.shippingFee = 0.00;
				this.calcTotalPrice();
			},
			//打开选择配送方式的弹出层
			openSelectType(){
				this.$refs.popupShipping.open('center');
			},
			//用户点击其中某一个配送方式后，将其放到前端显示的系统中
			checkType(item){
				this.cautionText = item.caution;
				this.selectValue = item.value;
				this.selectText = item.text;
				this.feeOrigin.forEach(option => {
					if (option.type === this.selectText) {
						this.shippingFee = option.Fee;
					}
				});
				this.calcTotalPrice();
				this.$refs.popupShipping.close();
			},
			showImg(url){
				var that = this
				// 预览图片
				uni.previewImage({
					urls: [url],
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			//用户点击商店名称后，自动跳转到该药房的详情页面
			goToShop(items){
				uni.navigateTo({
					url: '/pages/shop_certificate/shop_certificate?shopName=' + encodeURIComponent(JSON.stringify(items.shopName)) 
						+ '&shopId=' + encodeURIComponent(JSON.stringify(items.shopId))
				});
			},
			/* 2023-09-03 下拉选择配送方式的方法先进行注释，目前使用的是弹出选择配送方式的形式
			selectChanged(e){
				this.$refs.popupShipping.open('center');
				let selectedOption = this.selectRange.find(option => option.value === this.selectValue);
				this.selectText = selectedOption ? selectedOption.text : '';
				this.feeOrigin.forEach(item => {
					if (item.type === this.selectText) {
						this.shippingFee = item.Fee;
					}
				});
				if(this.selectText === "请选择"){
					this.shippingFee = 0.00;
				}
				this.calcTotalPrice();
				if(this.selectText === "跑腿（第三方）"){
					this.cautionText = "药房营业时间内订单，收到订单15分钟内完成打包，并交由跑腿（第三方）配送。"
				}else if (this.selectText === "快递邮寄"){
					if(this.isShopping){
						this.cautionText = "药房营业时间内订单，当天完成发货。"
					}else{
						this.cautionText = "药房营业时间外订单，第二天营业开始2小时内完成发货。"
					}
				}else if (this.selectText === "药房自配"){
					if(this.isShopping){
						this.cautionText = "药房营业时间内订单，2小时内完成配送。"
					}else{
						this.cautionText = "药房营业时间外订单，第二天营业开始2小时内完成配送。"
					}
				}else if (this.selectText === "到店自取"){
					this.cautionText = "药房收到订单后20分钟内完成订单打包，顾客凭订单号到店取药。"
				}
			},
			*/
			fatherMethods(e) {
				console.log('父组件方法', e); // 父组件方法
				this.addOver(e)
			},
			//添加用药人结束后执行的方法
			addOver(res) {
				// this.getGoodsUser()
				this.$refs.popup.close();
			},
			// 提交订单
			submitOrder() {
				
				uni.requestSubscribeMessage({
					//此处填写申请模板的模板ID
					tmplIds: ['JZGbfSSv0-jB5yS4GObkqD0TUrPqDdAbalAcz70xjZg'],
					success(res) {
						console.log(res)
					},

				})
				//先进行合规检查
				if (!this.checkboxSelected) {
					uni.$showMsg("请先阅读并同意《商品验收标准》，谢谢！", 3000);
					
					return;
				}
				if (this.selectText === '' || this.selectText === "请点击此处选择..."){
					uni.$showMsg("请先选择配送方式再结算", 3000);
					
					return;
				}
				if (this.selectedAddress.address === '请点击此处选择收货地址') {
					uni.$showMsg("请先选择收货地址再结算", 3000);
					
					return;
				}
				if (Number(this.totalPrice) === Number(this.shippingFee)){
					uni.$showMsg("亲，您购买的药品没货了，请联系药房补货", 3000);

					return;
				}
				this.validSubmit=false
				uni.showLoading({
					title: "请稍等...",
					mask: true
				});
				console.log(this.locationId);
				//先要获取一下最新的库存和价格，如果价格和库存不一致的话需要进行提示用户
				this.realTimePricing = this.shops[0].drugs.map(drug => {
					return {
						goodsId: drug.drugId,
						goodsOuterId: drug.drugId,
						shopId: this.shops[0].shopId
					};
				});
				this.getRealTimePricing();
			},
			//获取准备购买商品的实时价格和库存
			async getRealTimePricing() {
				const url = '/api/Goods/getShopSellGoodsInfo';
				const method = 'POST';
				const data = {
					Body: JSON.stringify(this.realTimePricing),
				};
				try {
					const response = await request('yzy_app', url, method, data);
					console.log(response); //统一格式：{"data":{}, "flag":99, "result":"成功"}
					this.priceMatch = false;
					this.canNext = false;
					if (response.code == 99) {
						const realTimePriceArray = response.data;
						console.log("比较数据");
						console.log(JSON.stringify(realTimePriceArray));
						console.log(JSON.stringify(this.shops[0]));
						
						// for(let drug of this.shops[0].drugs) {
						// 	let match = realTimePriceArray.find(item => item.goodsId === drug.drugId && item
						// 		.shopId === this.shops[0]
						// 		.shopId);
						// 	if (match) {
						// 		if (drug.num <= match.inventory && drug.price === match.price) {
						// 			console.log('购买库存和价格一致，无需同步，drugId: ' + drug.drugId);
						// 			this.priceMatch = true;
						// 			this.canNext = true;
						// 		} else {
						// 			this.priceMatch = false;
						// 			this.canNext = true;
						// 		}
						// 	} else {
						// 		this.canNext = false;
						// 	}
						// 	//如果完全没有匹配上，则不允许再继续支付
						// 	if (this.canNext === false) {
						// 		uni.$showMsg("未查询到所购买商品的价格和库存信息", 3000);
						// 		this.validSubmit=true
						// 		return;
						// 	}
						// 	//如果只是部分商品没有匹配上，那需要提示用户，并进行更新库存和价格
						// 	if (this.priceMatch === false) {
						// 		var that = this;
						// 		//TODO：同步云找药库存价格表
						// 		let match = realTimePriceArray.find(item => item.goodsId === drug
						// 			.drugId && item
						// 			.shopId === this.shops[0].shopId);
						// 		if (match) {
						// 			//(调低)如果云找药价格高于智慧药房价格，则提示用户价格高于后台数据
						// 			//match是智慧药房的价格和库存
						// 			//drug是云找药的价格和购买数量
						// 			if (drug.price >= match.price) {
						// 				this.allMatch = false;
						// 				drug.price = match.price;
						// 				console.log('(调低)价格同步：drugId: ' + drug.drugId);
						// 			}
						// 			//(调高)如果云找药价格低于智慧药房价格，则提示用户价格低于后台数据，退出
						// 			//match是智慧药房的价格和库存
						// 			//drug是云找药的价格和购买数量
						// 			else if (drug.price < match.price){
						// 				this.allMatch = false;
						// 				console.log('(调高)价格同步：drugId: ' + drug.drugId);
						// 				uni.showToast({
						// 					duration: 5000,
						// 					mask: true,
						// 					title: '请注意，当前价格低于后台价格，请重新选择商品购买',
						// 					icon: 'none'
						// 				});
						// 				that.canNext = false;
						// 				setTimeout(function() {
						// 					uni.reLaunch({
						// 						url:'/pages/shopping_cart/shopping_cart'
						// 					})
						// 				}, 5000);
						// 				this.updatePriceAndInventoryToYzy(realTimePriceArray);
						// 				this.validSubmit=true
						// 				return;
						// 			}
						// 			if (drug.num > match.inventory) {
						// 				this.allMatch = false;
						// 				drug.num = match.inventory;
						// 				console.log('购买数量同步：drugId: ' + drug.drugId);
						// 			}
						// 		} 
						// 		uni.$showMsg("请留意，因后台数据变化，价格和数量存在变动", 3000);
						// 		this.calcTotalPrice();
						// 	}
						// }
						// //如果不能下一步，一定要进行控制，否则用户会重复提交
						// if(this.allMatch === false || this.canNext === false){
						// 	//在这里对数据进行保存，即将智慧药房返回回来的数据重新保存到云找药
						// 	this.updatePriceAndInventoryToYzy(realTimePriceArray);
						// 	this.validSubmit=true
						// 	return;
						// }
						this.priceMatch  = true
						this.canNext = true
						if (this.priceMatch === true && this.canNext === true) {
							
							if(this.selectPayValue=='微信支付'){
								this.Pay();
							}else if(this.selectPayValue=='微信医保支付'){
								this.yinhaiPay()
								// uni.hideLoading()
								// uni.$showMsg("医保支付暂未开通", 2000);
								// this.validSubmit=true
							}
							
						}else{
							this.validSubmit=true
						}
					} else {
						console.log("-99" + response.result);
						uni.$showMsg(response.result, 3000);
					}
				} catch (error) {
					uni.$showMsg(error, 3000);
				}
			},
			//将智慧药房返回的价格信息重新同步回云找药系统中
			async updatePriceAndInventoryToYzy(realTimePriceArray) {
				const url = '/api/shop/updatePriceAndInventoryToYzy';
				const method = 'POST';
				const data = {
					realTimePriceArray: realTimePriceArray
				};
				try {
					const response = await request('yzy_app', url, method, data);
					console.log(response); //统一格式：{"data":{}, "flag":99, "result":"成功"}
					if (response.code == 99) {
						console.log("价格&库存同步成功！");
					} else {
						console.log("-99" + response.result);
					}
				} catch (error) {
					console.log(error);
				}
			},
			async yinhaiPay(){
				const transformedDrugs = this.shops[0].drugs.map(drug => {
					return {
						id: drug.id,
						goodsId: drug.drugId,
						num: drug.num,
						price: drug.price
					};
				});
				
				const url = '/api/Trade/yinHaiPay';
				const method = 'POST';
				const data = {
					openid: uni.getStorageSync("openid"),
					shopId: this.shops[0].shopId,
					goodsList: transformedDrugs,
					locationId: this.locationId,
					memo: this.memo,
					shippingFee: this.shippingFee,
					type: this.selectText,
					payType: this.selectPayValue,
					goodsUserId:this.selectPersonId,
				};
				try {
					const response = await request('yzy_app', url, method, data);
					console.log(response); //统一格式：{"data":{}, "flag":99, "result":"成功"}
					if (response.code == 99) {
						//this.requestWxPay(response.data, response.data.main_order_id)
						uni.hideLoading();
						
						uni.redirectTo({
							url:'/subPackage_yinhai/yinhaiPay/yinhaiPay?orderInfo='+encodeURIComponent(JSON.stringify(response.data))
						})
						
					} else {
						uni.showToast({
							icon: 'none',
							title: '创建订单失败:'+response.msg
						})
						this.validSubmit=true
					}
				} catch (error) {
					console.log(error);
					uni.showToast({
						icon: 'none',
						title: '服务器出错了'
					})
					this.validSubmit=true
				}
			},
			//拉起微信支付
			async Pay() {
				
				const transformedDrugs = this.shops[0].drugs.map(drug => {
					return {
						id: drug.id,
						goodsId: drug.drugId,
						num: drug.num,
						price: drug.price
					};
				});
				const url = '/api/Trade/wechatPay';
				const method = 'POST';
				const data = {
					openid: uni.getStorageSync("openid"),
					shopId: this.shops[0].shopId,
					goodsList: transformedDrugs,
					locationId: this.locationId,
					memo: this.memo,
					shippingFee: this.shippingFee,
					type: this.selectText
				};
				try {
					const response = await request('yzy_app', url, method, data);
					console.log(response); //统一格式：{"data":{}, "flag":99, "result":"成功"}
					if (response.code == 99) {
						this.requestWxPay(response.data, response.data.main_order_id)
						uni.hideLoading();
					} else {
						uni.showToast({
							icon: 'none',
							title: '创建订单失败'
						})
					}
				} catch (error) {
					console.log(error);
					uni.showToast({
						icon: 'none',
						title: '服务器出错了'
					})
				}
			},
			requestWxPay(data, main_order_id) {
				var that = this;
				uni.requestPayment({
					provider: 'wxpay', //支付类型-固定值
					timeStamp: data.timeStamp, // 时间戳（单位：秒）
					nonceStr: data.nonceStr, // 随机字符串
					package: data.package, // 固定值
					signType: data.signType, //固定值
					paySign: data.paySign, //签名

					success: function(res) {
						console.log("支付成功");
						uni.showToast({
							icon: 'success',
							title: '支付成功',
							mask: true
						})
						that.testQueryPay(data.out_order_id, main_order_id) //支付成功后查询一下微信支付订单状态
						that.shops = null;
						//跳转支付成功的页面
						uni.redirectTo({
							url:'/pages/payment_success/payment_success'
						})
						that.validSubmit = true
					},
					fail: function(err) {
						// console.log('fail:' + JSON.stringify(err));
						console.log("支付失败");
						uni.showToast({
							icon: 'none',
							title: '支付失败'
						})
						
						//用户未支付则发一个通知
						that.testQueryPay(data.out_order_id, main_order_id) //支付成功后查询一下微信支付订单状态
						
						uni.reLaunch({
							url:'/pages/user_order/user_order?num=test1'
						})
						that.validSubmit = true
					}
				})
			},
			//测试查询支付
			async testQueryPay(out_order_id, main_order_id) {
				const url = '/api/example/testQueryPayOrder';
				const method = 'POST';
				const data = {
					openid: uni.getStorageSync("openid"),
					main_order_id: main_order_id,
					out_order_id: out_order_id,
				};
				try {
					const response = await request('yzy_app', url, method, data);
					console.log(response); //统一格式：{"data":{}, "flag":99, "result":"成功"}
					if (response.code == 99) {
						console.log("真实的response.msg")
						console.log(response.msg);
						console.log('operateId：' + response.data.operateId);
						this.uploadOrderToZhyf(response.msg, response.data.operateId);
						console.log('查询成功并回填数据库成功！');
					}
				} catch (error) {
					console.log(error);

				}
			},
			//上传智慧药房做账
			async uploadOrderToZhyf(msg, operateId) {
				const msgJson = JSON.parse(msg);
				msgJson.operateId = operateId;
				console.log(JSON.stringify(msgJson));
				const url = '/api/Zhyf/makeAccountForOuterOrder';
				const method = 'POST';
				const data = JSON.stringify(msgJson);
				try {
					console.log(data);
					const response = await requestZhyf('yzy_app', url, method, data);
					console.log(response); //统一格式：{"data":{}, "flag":99, "result":"成功"}
					if (response.code == 99) {
						console.log("销售记录上传智慧药房成功！");
					} else {

					}
				} catch (error) {
					console.log(error);
				}
			},
			//当复选框的选中项变更时触发
			checkboxChange() {
				this.checkboxSelected = !this.checkboxSelected;
			},
			openReadText() {
				uni.navigateTo({
					url: '/pages/agreement_order/agreement_order'
				});
			},
			bindTextAreaBlur: function(e) {
				this.memo = e.detail.value;
				console.log(e.detail.value);
			},
			calcTotalPrice() {
				//总价
				const drugsWithTotal = this.shops.map(shop => ({
					...shop,
					drugs: shop.drugs.map(drug => ({
						...drug,
						total: drug.num * drug.price
					}))
				}))
				const shopsWithTotal = drugsWithTotal.map(shop => ({
					...shop,
					total: shop.drugs.reduce((acc, drug) => acc + drug.total, 0)
				}));
				const total = shopsWithTotal.reduce((acc, shop) => acc + shop.total, 0);

				//商品总数量
				const drugs = this.shops.flatMap(shop =>
					shop.drugs.map(drug => drug.num)
				);

				const totalNum = drugs.reduce((a, b) => a + b, 0);
				console.log(this.shippingFee);
				
				//2023-09-06
				//前端浮点型计算例子
				let originalTotalPrice = total + this.shippingFee;
				// 将浮点数转换为字符串
				let priceString = originalTotalPrice.toString();
				// 使用正则表达式提取整数位和小数点后两位
				let match = priceString.match(/^-?\d+(?:\.\d{0,2})?/);
				// 提取的结果即为整数位和小数点后两位
				let truncatedPrice = match ? match[0] : "";
				this.totalPrice = truncatedPrice;
				
				this.totalNum = totalNum;
			},
			//获取用户的地址信息
			async getAddressList() {
				const url = '/api/user/getAddressList';
				const method = 'POST';
				const data = {
					openid: uni.getStorageSync("openid")
				};
				try {
					const response = await request('yzy_app', url, method, data);
					console.log(response); //统一格式：{"data":{}, "flag":99, "result":"成功"}
					if (response.code == 99) {
						console.log("99" + response.result);
						this.selectedAddress = response.data.data[0];
						this.selectedAddress.phone = response.data.data[0].tel;
						this.selectedAddress.address = response.data.data[0].details;
						console.log(this.selectedAddress);
					} else {
						console.log("-99" + response.result);
					}
				} catch (error) {
					console.log(error);
				}
			},
			showAddFrame() {
				this.$refs.popup.open('center');
			},
			//2023-08-30 更新配送体系上线
			//获取用户的地址信息
			async getShopShippingFee() {
				const url = '/api/shop/getShopShippingFee';
				const method = 'POST';
				const data = {
					shopId: this.shops[0].shopId,
					addressId: this.locationId
				};
				try {
					const response = await request('yzy_app', url, method, data);
					console.log('ShippingFee');
					console.log(response); //统一格式：{"data":{}, "flag":99, "result":"成功"}
					if (response.data.flag == 99) {
						var that = this;
						//获取配送方式及其费用
						this.feeOrigin = response.data.data;
						//初始化下拉选择框
						this.selectRange = [];
						//初始化配送距离
						this.distance = response.data.distance;
						//初始化门店的营业时间
						this.businessHours = response.data.businessHours;
						//初始化当前是否在门店的营业时间中
						if(response.data.isShopping === "true"){
							this.isShopping = true;
						} else {
							this.isShopping = false;
						}
						//先按照Fee从小到大排序
						this.feeOrigin.sort((a, b) => a.Fee - b.Fee);
						//把排序后的数据放回到下拉选择框中
						this.feeOrigin.forEach(item => {
							var cautionTextVar = '';
							//初始化提示信息
							if(item.type === "跑腿（第三方）"){
								if(this.isShopping){
									cautionTextVar = that.businessHours + "内订单，收到订单15分钟内完成打包，并交由跑腿（第三方）配送。"
								}else{
									cautionTextVar = that.businessHours + "外订单，第二天营业开始15分钟内完成打包，并交由跑腿（第三方）配送。"
								}
							}else if (item.type === "快递邮寄"){
								if(this.isShopping){
									cautionTextVar = that.businessHours + "内订单，当天完成发货。"
								}else{
									cautionTextVar = that.businessHours + "外订单，第二天营业开始2小时内完成发货。"
								}
							}else if (item.type === "药房自配"){
								if(this.isShopping){
									cautionTextVar = that.businessHours + "内订单，2小时内完成配送。"
								}else{
									cautionTextVar = that.businessHours + "外订单，第二天营业开始2小时内完成配送。"
								}
							}else if (item.type === "到店自取"){
								if(this.isShopping){
									cautionTextVar = that.businessHours + "内订单，药房收到订单后20分钟内完成订单打包，顾客凭订单号到店取药。"
								}else{
									cautionTextVar = that.businessHours + "外订单，第二天营业开始20分钟内完成订单打包，顾客凭订单号到店取药。"
								}
							}
							this.selectRange.push({value: item.id, text: item.type, price: '￥'+item.Fee.toFixed(2), caution: cautionTextVar});
							cautionTextVar = '';
						});
						//如果是冷链药物的处理
						if(this.coldFlag === true){
							this.selectRange = this.selectRange.filter(item => item.text === "药房自配" || item.text === "到店自取" || item.text === "请选择");
						}
						this.calcTotalPrice();
					} else {
						console.log("-99" + response.data.result);
					}
				} catch (error) {
					console.log(error);
				}
			},
			//2023-09-01 获取当前品种的冷链信息
			async getGoodsColdFlag() {
				const coldDrugsCheck = this.shops[0].drugs.map(drug => {
					return {
						goodsId: drug.drugId
					};
				});
				const url = '/api/goods/getGoodsColdFlag';
				const method = 'POST';
				const data = {
					goodsList: coldDrugsCheck
				};
				try {
					const response = await request('yzy_app', url, method, data);
					console.log(response); //统一格式：{"data":{}, "flag":99, "result":"成功"}
					if (response.data.flag == 99) {
						if (response.data.coldFlag === "y"){
							this.coldFlag = true;
						}else{
							this.coldFlag = false;
						}
					} else {
						console.log("-99" + response.msg);
					}
				} catch (error) {
					console.log(error);
				}
			},
		},
		onLoad(option) {
			const item = JSON.parse(decodeURIComponent(option.drug));
			console.log(item);
			this.shops = item;
			const allHaveYFlag = this.shops[0].drugs.every(obj => obj.healthInsuranceFlag == 'y');
			
			if (allHaveYFlag) {
				//是否可医保支付
			    this.MedicarePaymentFlag = true
				this.selectPayRange = [{"value": '微信支付', "text": "微信支付"},{"value": '微信医保支付', "text": "微信医保支付"}]
			} else {
			    this.MedicarePaymentFlag = false
			}
		},
		created() {
			uni.$on('pageClosedLocation', (data) => {
				console.log("pageClosedLocation");
				console.log(data);
				this.selectedAddress.name = data.name;
				this.selectedAddress.phone = data.tel;
				this.selectedAddress.address = data.details;
				this.selectedAddress.city = data.city;
				this.locationId = data.id;
				console.log("this.locationId:" + this.locationId);
				this.turntypeToDefault();
				this.getGoodsColdFlag();
				this.getShopShippingFee();
			});
			uni.$on('addressUpdated', (data) => {
				this.getAddressList();
				console.log("获取地址成功！");
				this.$refs.child.getAddressList();
			});
			uni.$on('pageClosedAddress', (data) => {
				this.getAddressList();
				console.log('pageClosedAddress: FromSelect');
				this.$refs.child.getAddressList();
			});
		},
		beforeDestroy() {
			// 在页面销毁时取消事件监听
			uni.$off('pageClosedLocation');
		}
	};
</script>

<style>
	.star-sign {
		color: red;
		padding-right: 10rpx;
	}
	.person-item {
		width: 25%;
		background-color: #F9F9F9;
		padding: 6rpx 30rpx 6rpx 12rpx;
		margin: 24rpx 12rpx 12rpx 8rpx;
		border-radius: 12rpx;
		border: #FFFFFF solid 4rpx;
		color: gray;
	}
	
	.person-name {
		font-weight: bold;
		font-size: 30rpx;
	}
	
	.person-row {
		flex-wrap: wrap;
	}
	.more-person-icon {
		width: 20rpx;
		height: 20rpx;
	}
	
	.select-person-title,
	.disease-list-title {
		display: flex;
		font-size: 36rpx;
		align-items: center;
	}
	.persong-item-selected {
		background-color: #1296DB;
		width: 25%;
		padding: 6rpx 30rpx 6rpx 12rpx;
		margin: 24rpx 12rpx 12rpx 8rpx;
		border-radius: 12rpx;
		border: #1296DB solid 4rpx;
		color: white;
	}
	.person-age {
			padding-left: 20rpx;
		}
	.more-person {
		display: flex;
		align-items: center;
		margin-left: auto;
	}
	
	.select-person-firstline {
		display: flex;
		align-items: center;
	}
	
	.select-person,
	.disease-list {
		background-color: #FFFFFF;
		border-radius: 24rpx;
		padding: 24rpx 24rpx;
		margin: 36rpx 24rpx 24rpx;
	}
	
	.more-person-icon {
		padding: 0 10rpx;
	}
	.yb-tag{
		    max-width: 69px;
		    line-height: 24rpx;
		    padding: 1px 3px;
		    border: #0aa71a solid 1px;
		    border-radius: 7px;
		    text-align: center;
		    align-items: center;
		    justify-content: center;
		    display: flex;
		    background: #0aa71a;
		    color: white;
		    font-size: 24rpx;
	}
	.form-container-shipping {
		padding: 10rpx 20rpx 0 20rpx;
	}
	
	.form-container {
		padding: 20rpx;
	}

	.form-item {
		display: flex;
		align-items: center;
		margin-bottom: 10upx;
		justify-content: space-between;
		padding: 0 20rpx;
	}
	
	.form-item-caution{
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 20rpx;
	}

	.label {
		width: 140rpx;
		display: flex;
		justify-content: space-between;
	}

	.line {
		height: 1upx;
		background-color: #ccc;
		margin: 10upx 0;
	}

	page {
		background-color: #F7FCFF;
	}

	.address-name-phone {
		display: flex;
		align-items: center;
	}

	.address-card {
		display: flex;
		align-items: center;
		background-color: #fff;
		padding: 20rpx;
		margin-bottom: 20rpx;
		border-radius: 24rpx;
	}

	.address-info {
		flex: 1;
		padding: 0 10rpx;
	}

	.address-name {
		font-size: 30rpx;
		font-weight: bold;
	}

	.address-phone {
		font-size: 30rpx;
		color: #636263;
		padding: 0 30rpx;
	}

	.address-details {
		font-size: 32rpx;
		color: #636263;
		margin-top: 10rpx;
	}

	.address-details-road {
		font-size: 32rpx;
		color: #636263;
		font-weight: bold;
	}

	.confirm-order {
		padding: 20rpx;
	}

	.order-list {
		margin-bottom: 20rpx;
		border-radius: 24rpx;
	}

	.order-item {
		margin-bottom: 20rpx;
	}

	.shop-name {
		font-size: 32rpx;
		font-weight: 800;
		margin-bottom: 10rpx;
		padding-top: 10rpx;
		padding-left: 6rpx;
	}

	.item-list {
		background-color: #fff;
		padding: 20rpx;
		border-radius: 32rpx;
	}

	.item {
		display: flex;
		align-items: center;
		margin-bottom: 10rpx;
		background-color: #fff;
		padding: 20rpx;
		border-radius: 32rpx;
	}

	.item-info {
		display: flex;
		align-items: center;
	}

	.item-details {
		    max-width: 55%;
		margin-left: 20rpx;
	}

	.item-name {
		width: 375rpx;
		display: flex;
		font-size: 28rpx;
		margin-bottom: 10rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		line-height: 40rpx;
	}

	.item-spec {
		font-size: 24rpx;
		color: #999;
	}
	
	.item-manu{
		font-size: 24rpx;
		color: #999;
		margin-bottom: 10rpx;
	}

	.item-price {
		font-size: 28rpx;
		color: #f00;
	}

	.item-quantity {
		font-size: 28rpx;
		color: #999;
		font-weight: bold;
		padding-left: 6rpx;
	}

	image {
		width: 120rpx;
		height: 120rpx;
	}

	.item-detail-right {
		display: flex;
		flex-direction: column;
		justify-items: right;
		width: 140rpx;
		justify-content: center;
	}

	.more-location-icon {
		width: 30rpx;
		height: 30rpx;
		padding: 0 20rpx;
	}

	.tabbar {
		width: 100%;
		height: 220rpx;
		background-color: #ffffff;
		position: fixed;
		bottom: -5rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		margin-left: -16rpx;
		z-index: 10;
	}

	.total-price {
		display: flex;
		font-size: 28rpx;
		font-weight: bold;
		text-align: right;
		margin-bottom: 20rpx;
	}

	.submit-btn {
		width: 240rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #1296DB;
		color: #fff;
		font-size: 32rpx;
		font-weight: bold;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		border-radius: 16rpx;
		margin-right: 20rpx;
		margin-left: 20rpx;
	}

	.total-price-num {
		color: red;
		font-size: 48rpx;
		font-weight: bold;
		padding-bottom: 20rpx;
	}

	.total-item {
		display: flex;
		align-items: center;
	}

	.caution-card {
		display: flex;
		flex-direction: column;
		align-items: left;
		background-color: #fff;
		padding: 20rpx;
		margin-bottom: 20rpx;
		border-radius: 24rpx;
		margin: 24rpx 0;
	}

	.caution-title {
		color: #1296DB;
		font-size: 28rpx;
		font-weight: bold;
	}

	.caution-content {
		color: #636263;
		font-size: 24rpx;
	}

	.checkbox-item {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 36rpx 0 10rpx 0;
	}

	.tabbar-commit {
		display: flex;
		margin-left: auto;
		margin-bottom: 20rpx;
	}

	.blank {
		height: 200rpx;
	}

	.memo {
		font-size: 24rpx;
		font-weight: bold;
		margin-left: -10rpx;
	}

	.card-shadow {
		box-shadow: 2px -1px 10px 0.5px rgba(0, 0, 0, 0.2);
	}

	.memo-card {
		border-radius: 24rpx;
	}

	.path-item {
		padding: 30rpx 20rpx;
		margin: 20rpx;
		border-bottom: 2rpx solid #1296DB;
		border-radius: 10px;
		background-color: #ffffff;
		color: #ffffff;
	}

	.item-main {
		display: flex;
		align-items: center;
	}

	/* .active {
		padding: 0 3rpx;
		border: 1px solid #1296DB;
		color: #1296DB;
		border-radius: 20rpx;
		font-size: 16rpx;
	} */

	.item-name {
		padding-right: 10rpx;
		font-size: 28rpx;
		color: #000;
	}
	
	.shop-title{
		display: flex;
		align-items: center;
		padding-left: 10rpx;
	}
	
	.shipping-fee-card{
		background-color: #FFF;
		border-radius: 24rpx;
		padding: 20rpx 0;
		margin-bottom: 20rpx;
	}
	
	.shipping-select{
		display: flex;
		width: 520rpx;
		padding: 0 20rpx;
	}
	
	.shipping-type-tag-list{
		display: flex;
		flex-wrap: wrap;
	}
	
	.shipping-type-tag {
		padding: 16rpx 10rpx;
	}
	
	.label-word{
		width: 140rpx;
		height: 50rpx;
		text-align: justify;
	}
	
	/* .label-word::after{
		width: 100%;
		display: inline-block;
		content: '';
	} */
	
	.popupShipping-panel{
		padding: 15px;
		background-color: #fff;
		border-radius: 15px;
		width: 90vw;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	.panel-item{
		padding: 30rpx 20rpx;
		margin: 10rpx 20rpx 10rpx 20rpx;
		border: 1rpx solid #1296DB;
		border-radius: 10px;
		background-color: #fff;
		color: #fff;
		box-shadow: 2px -1px 10px 0.5px rgba(0, 0, 0, 0.2);
		width: 595rpx;
	}
	
	.panel-item-main{
		display: flex;
		align-items: center;
	}
	
	.item-type-popup {
		padding-right: 10rpx;
		font-size: 28rpx;
		color: #000;
	}
	
	.item-type-price {
		padding-left: 40rpx;
		color: red;
		margin-left: auto;
		padding-right: 50rpx;
	}
	
	.item-type-caution {
		color: #000;
	}
	
	.item-type-name{
		padding-left: 20rpx;
		font-weight: bold;
	}
	
	.caution-caution{
		display: flex;
		white-space: nowrap;
	}
	
	.type-choose{
		display: flex;
		width: 520rpx;
		height: 56rpx;
		border: 1rpx solid #ccc;
		border-radius: 10rpx;
		margin-left: 10rpx;
		justify-content: space-between;
		padding-right: 20rpx;
	}
	
	.type-choose-text{
		margin-left: 14rpx;
		color: #636263;
		font: 30rpx;
		font-style: italic;
	}
	
	.type-choosed-text{
		margin-left: 14rpx;
		color: #000;
		font: 30rpx;
		font-weight: bold;
	}
</style>
