/**
 * 全国所有省市区静态数据，可根据需要修改
 * @type {{provincesArr: string[], provinces: {北京市: {id: number, citiesArr: string[], cities: {北京市: {id: number, areasArr: string[], areas: {东城区: {id: number}, 西城区: {id: number}, 崇文区: {id: number}, 宣武区: {id: number}, 朝阳区: {id: number}, 丰台区: {id: number}, 石景山区: {id: number}, 海淀区: {id: number}, 门头沟区: {id: number}, 房山区: {id: number}, 通州区: {id: number}, 顺义区: {id: number}, 昌平区: {id: number}, 大兴区: {id: number}, 怀柔区: {id: number}, 平谷区: {id: number}, 密云县: {id: number}, 延庆县: {id: number}}}}}, 天津市: {id: number, citiesArr: string[], cities: {天津市: {id: number, areasArr: string[], areas: {和平区: {id: number}, 河东区: {id: number}, 河西区: {id: number}, 南开区: {id: number}, 河北区: {id: number}, 红桥区: {id: number}, 塘沽区: {id: number}, 汉沽区: {id: number}, 大港区: {id: number}, 东丽区: {id: number}, 西青区: {id: number}, 津南区: {id: number}, 北辰区: {id: number}, 武清区: {id: number}, 宝坻区: {id: number}, 宁河县: {id: number}, 静海县: {id: number}, 蓟县: {id: number}}}}}, 河北省: {id: number, citiesArr: string[], cities: {邯郸市: {id: number, areasArr: string[], areas: {邯山区: {id: number}, 丛台区: {id: number}, 复兴区: {id: number}, 峰峰矿区: {id: number}, 邯郸县: {id: number}, 临漳县: {id: number}, 成安县: {id: number}, 大名县: {id: number}, 涉县: {id: number}, 磁县: {id: number}, 肥乡县: {id: number}, 永年县: {id: number}, 邱县: {id: number}, 鸡泽县: {id: number}, 广平县: {id: number}, 馆陶县: {id: number}, 魏县: {id: number}, 曲周县: {id: number}, 武安市: {id: number}, 市辖区: {id: number}}}, 石家庄市: {id: number, areasArr: string[], areas: {长安区: {id: number}, 桥东区: {id: number}, 桥西区: {id: number}, 新华区: {id: number}, 井陉矿区: {id: number}, 裕华区: {id: number}, 井陉县: {id: number}, 正定县: {id: number}, 栾城县: {id: number}, 行唐县: {id: number}, 灵寿县: {id: number}, 高邑县: {id: number}, 深泽县: {id: number}, 赞皇县: {id: number}, 无极县: {id: number}, 平山县: {id: number}, 元氏县: {id: number}, 赵县: {id: number}, 辛集市: {id: number}, 藁城市: {id: number}, 晋州市: {id: number}, 新乐市: {id: number}, 鹿泉市: {id: number}, 市辖区: {id: number}}}, 保定市: {id: number, areasArr: string[], areas: {新市区: {id: number}, 北市区: {id: number}, 南市区: {id: number}, 满城县: {id: number}, 清苑县: {id: number}, 涞水县: {id: number}, 阜平县: {id: number}, 徐水县: {id: number}, 定兴县: {id: number}, 唐县: {id: number}, 高阳县: {id: number}, 容城县: {id: number}, 涞源县: {id: number}, 望都县: {id: number}, 安新县: {id: number}, 易县: {id: number}, 曲阳县: {id: number}, 蠡县: {id: number}, 顺平县: {id: number}, 博野县: {id: number}, 雄县: {id: number}, 涿州市: {id: number}, 定州市: {id: number}, 安国市: {id: number}, 高碑店市: {id: number}, 市辖区: {id: number}}}, 张家口市: {id: number, areasArr: string[], areas: {桥东区: {id: number}, 桥西区: {id: number}, 宣化区: {id: number}, 下花园区: {id: number}, 宣化县: {id: number}, 张北县: {id: number}, 康保县: {id: number}, 沽源县: {id: number}, 尚义县: {id: number}, 蔚县: {id: number}, 阳原县: {id: number}, 怀安县: {id: number}, 万全县: {id: number}, 怀来县: {id: number}, 涿鹿县: {id: number}, 赤城县: {id: number}, 崇礼县: {id: number}, 市辖区: {id: number}}}, 承德市: {id: number, areasArr: string[], areas: {双桥区: {id: number}, 双滦区: {id: number}, 鹰手营子矿区: {id: number}, 承德县: {id: number}, 兴隆县: {id: number}, 平泉县: {id: number}, 滦平县: {id: number}, 隆化县: {id: number}, 丰宁满族自治县: {id: number}, 宽城满族自治县: {id: number}, 围场满族蒙古族自治县: {id: number}, 市辖区: {id: number}}}, 唐山市: {id: number, areasArr: string[], areas: {路南区: {id: number}, 路北区: {id: number}, 古冶区: {id: number}, 开平区: {id: number}, 丰南区: {id: number}, 丰润区: {id: number}, 滦县: {id: number}, 滦南县: {id: number}, 乐亭县: {id: number}, 迁西县: {id: number}, 玉田县: {id: number}, 唐海县: {id: number}, 遵化市: {id: number}, 迁安市: {id: number}, 市辖区: {id: number}}}, 廊坊市: {id: number, areasArr: string[], areas: {安次区: {id: number}, 广阳区: {id: number}, 固安县: {id: number}, 永清县: {id: number}, 香河县: {id: number}, 大城县: {id: number}, 文安县: {id: number}, 大厂回族自治县: {id: number}, 霸州市: {id: number}, 三河市: {id: number}, 市辖区: {id: number}}}, 沧州市: {id: number, areasArr: string[], areas: {新华区: {id: number}, 运河区: {id: number}, 沧县: {id: number}, 青县: {id: number}, 东光县: {id: number}, 海兴县: {id: number}, 盐山县: {id: number}, 肃宁县: {id: number}, 南皮县: {id: number}, 吴桥县: {id: number}, 献县: {id: number}, 孟村回族自治县: {id: number}, 泊头市: {id: number}, 任丘市: {id: number}, 黄骅市: {id: number}, 河间市: {id: number}, 市辖区: {id: number}}}, 衡水市: {id: number, areasArr: string[], areas: {桃城区: {id: number}, 枣强县: {id: number}, 武邑县: {id: number}, 武强县: {id: number}, 饶阳县: {id: number}, 安平县: {id: number}, 故城县: {id: number}, 景县: {id: number}, 阜城县: {id: number}, 冀州市: {id: number}, 深州市: {id: number}, 市辖区: {id: number}}}, 邢台市: {id: number, areasArr: string[], areas: {桥东区: {id: number}, 桥西区: {id: number}, 邢台县: {id: number}, 临城县: {id: number}, 内丘县: {id: number}, 柏乡县: {id: number}, 隆尧县: {id: number}, 任县: {id: number}, 南和县: {id: number}, 宁晋县: {id: number}, 巨鹿县: {id: number}, 新河县: {id: number}, 广宗县: {id: number}, 平乡县: {id: number}, 威县: {id: number}, 清河县: {id: number}, 临西县: {id: number}, 南宫市: {id: number}, 沙河市: {id: number}, 市辖区: {id: number}}}, 秦皇岛市: {id: number, areasArr: string[], areas: {海港区: {id: number}, 山海关区: {id: number}, 北戴河区: {id: number}, 青龙满族自治县: {id: number}, 昌黎县: {id: number}, 抚宁县: {id: number}, 卢龙县: {id: number}, 市辖区: {id: number}}}}}, 山西省: {id: number, citiesArr: string[], cities: {朔州市: {id: number, areasArr: string[], areas: {朔城区: {id: number}, 平鲁区: {id: number}, 山阴县: {id: number}, 应县: {id: number}, 右玉县: {id: number}, 怀仁县: {id: number}, 市辖区: {id: number}}}, 忻州市: {id: number, areasArr: string[], areas: {忻府区: {id: number}, 定襄县: {id: number}, 五台县: {id: number}, 代县: {id: number}, 繁峙县: {id: number}, 宁武县: {id: number}, 静乐县: {id: number}, 神池县: {id: number}, 五寨县: {id: number}, 岢岚县: {id: number}, 河曲县: {id: number}, 保德县: {id: number}, 偏关县: {id: number}, 原平市: {id: number}, 市辖区: {id: number}}}, 太原市: {id: number, areasArr: string[], areas: {小店区: {id: number}, 迎泽区: {id: number}, 杏花岭区: {id: number}, 尖草坪区: {id: number}, 万柏林区: {id: number}, 晋源区: {id: number}, 清徐县: {id: number}, 阳曲县: {id: number}, 娄烦县: {id: number}, 古交市: {id: number}, 市辖区: {id: number}}}, 大同市: {id: number, areasArr: string[], areas: {矿区: {id: number}, 南郊区: {id: number}, 新荣区: {id: number}, 阳高县: {id: number}, 天镇县: {id: number}, 广灵县: {id: number}, 灵丘县: {id: number}, 浑源县: {id: number}, 左云县: {id: number}, 大同县: {id: number}, 市辖区: {id: number}, 城区: {id: number}}}, 阳泉市: {id: number, areasArr: string[], areas: {矿区: {id: number}, 平定县: {id: number}, 盂县: {id: number}, 市辖区: {id: number}, 城区: {id: number}, 郊区: {id: number}}}, 晋中市: {id: number, areasArr: string[], areas: {榆次区: {id: number}, 榆社县: {id: number}, 左权县: {id: number}, 和顺县: {id: number}, 昔阳县: {id: number}, 寿阳县: {id: number}, 太谷县: {id: number}, 祁县: {id: number}, 平遥县: {id: number}, 灵石县: {id: number}, 介休市: {id: number}, 市辖区: {id: number}}}, 长治市: {id: number, areasArr: string[], areas: {长治县: {id: number}, 襄垣县: {id: number}, 屯留县: {id: number}, 平顺县: {id: number}, 黎城县: {id: number}, 壶关县: {id: number}, 长子县: {id: number}, 武乡县: {id: number}, 沁县: {id: number}, 沁源县: {id: number}, 潞城市: {id: number}, 市辖区: {id: number}, 城区: {id: number}, 郊区: {id: number}}}, 晋城市: {id: number, areasArr: string[], areas: {沁水县: {id: number}, 阳城县: {id: number}, 陵川县: {id: number}, 泽州县: {id: number}, 高平市: {id: number}, 市辖区: {id: number}, 城区: {id: number}}}, 临汾市: {id: number, areasArr: string[], areas: {尧都区: {id: number}, 曲沃县: {id: number}, 翼城县: {id: number}, 襄汾县: {id: number}, 洪洞县: {id: number}, 古县: {id: number}, 安泽县: {id: number}, 浮山县: {id: number}, 吉县: {id: number}, 乡宁县: {id: number}, 大宁县: {id: number}, 隰县: {id: number}, 永和县: {id: number}, 蒲县: {id: number}, 汾西县: {id: number}, 侯马市: {id: number}, 霍州市: {id: number}, 市辖区: {id: number}}}, 吕梁市: {id: number, areasArr: string[], areas: {离石区: {id: number}, 文水县: {id: number}, 交城县: {id: number}, 兴县: {id: number}, 临县: {id: number}, 柳林县: {id: number}, 石楼县: {id: number}, 岚县: {id: number}, 方山县: {id: number}, 中阳县: {id: number}, 交口县: {id: number}, 孝义市: {id: number}, 汾阳市: {id: number}, 市辖区: {id: number}}}, 运城市: {id: number, areasArr: string[], areas: {盐湖区: {id: number}, 临猗县: {id: number}, 万荣县: {id: number}, 闻喜县: {id: number}, 稷山县: {id: number}, 新绛县: {id: number}, 绛县: {id: number}, 垣曲县: {id: number}, 夏县: {id: number}, 平陆县: {id: number}, 芮城县: {id: number}, 永济市: {id: number}, 河津市: {id: number}, 市辖区: {id: number}}}}}, 内蒙古自治区: {id: number, citiesArr: string[], cities: {呼伦贝尔市: {id: number, areasArr: string[], areas: {海拉尔区: {id: number}, 阿荣旗: {id: number}, 莫力达瓦达斡尔族自治旗: {id: number}, 鄂伦春自治旗: {id: number}, 鄂温克族自治旗: {id: number}, 陈巴尔虎旗: {id: number}, 新巴尔虎左旗: {id: number}, 新巴尔虎右旗: {id: number}, 满洲里市: {id: number}, 牙克石市: {id: number}, 扎兰屯市: {id: number}, 额尔古纳市: {id: number}, 根河市: {id: number}, 市辖区: {id: number}}}, 呼和浩特市: {id: number, areasArr: string[], areas: {新城区: {id: number}, 回民区: {id: number}, 玉泉区: {id: number}, 赛罕区: {id: number}, 土默特左旗: {id: number}, 托克托县: {id: number}, 和林格尔县: {id: number}, 清水河县: {id: number}, 武川县: {id: number}, 市辖区: {id: number}}}, 包头市: {id: number, areasArr: string[], areas: {东河区: {id: number}, 昆都仑区: {id: number}, 青山区: {id: number}, 石拐区: {id: number}, 白云鄂博矿区: {id: number}, 九原区: {id: number}, 土默特右旗: {id: number}, 固阳县: {id: number}, 达尔罕茂明安联合旗: {id: number}, 市辖区: {id: number}}}, 乌海市: {id: number, areasArr: string[], areas: {海勃湾区: {id: number}, 海南区: {id: number}, 乌达区: {id: number}, 市辖区: {id: number}}}, 乌兰察布市: {id: number, areasArr: string[], areas: {集宁区: {id: number}, 卓资县: {id: number}, 化德县: {id: number}, 商都县: {id: number}, 兴和县: {id: number}, 凉城县: {id: number}, 察哈尔右翼前旗: {id: number}, 察哈尔右翼中旗: {id: number}, 察哈尔右翼后旗: {id: number}, 四子王旗: {id: number}, 丰镇市: {id: number}, 市辖区: {id: number}}}, 通辽市: {id: number, areasArr: string[], areas: {科尔沁区: {id: number}, 科尔沁左翼中旗: {id: number}, 科尔沁左翼后旗: {id: number}, 开鲁县: {id: number}, 库伦旗: {id: number}, 奈曼旗: {id: number}, 扎鲁特旗: {id: number}, 霍林郭勒市: {id: number}, 市辖区: {id: number}}}, 赤峰市: {id: number, areasArr: string[], areas: {红山区: {id: number}, 元宝山区: {id: number}, 松山区: {id: number}, 阿鲁科尔沁旗: {id: number}, 巴林左旗: {id: number}, 巴林右旗: {id: number}, 林西县: {id: number}, 克什克腾旗: {id: number}, 翁牛特旗: {id: number}, 喀喇沁旗: {id: number}, 宁城县: {id: number}, 敖汉旗: {id: number}, 市辖区: {id: number}}}, 鄂尔多斯市: {id: number, areasArr: string[], areas: {东胜区: {id: number}, 达拉特旗: {id: number}, 准格尔旗: {id: number}, 鄂托克前旗: {id: number}, 鄂托克旗: {id: number}, 杭锦旗: {id: number}, 乌审旗: {id: number}, 伊金霍洛旗: {id: number}, 市辖区: {id: number}}}, 巴彦淖尔市: {id: number, areasArr: string[], areas: {临河区: {id: number}, 五原县: {id: number}, 磴口县: {id: number}, 乌拉特前旗: {id: number}, 乌拉特中旗: {id: number}, 乌拉特后旗: {id: number}, 杭锦后旗: {id: number}, 市辖区: {id: number}}}, 锡林郭勒盟: {id: number, areasArr: string[], areas: {二连浩特市: {id: number}, 锡林浩特市: {id: number}, 阿巴嘎旗: {id: number}, 苏尼特左旗: {id: number}, 苏尼特右旗: {id: number}, 东乌珠穆沁旗: {id: number}, 西乌珠穆沁旗: {id: number}, 太仆寺旗: {id: number}, 镶黄旗: {id: number}, 正镶白旗: {id: number}, 正蓝旗: {id: number}, 多伦县: {id: number}}}, 兴安盟: {id: number, areasArr: string[], areas: {乌兰浩特市: {id: number}, 阿尔山市: {id: number}, 科尔沁右翼前旗: {id: number}, 科尔沁右翼中旗: {id: number}, 扎赉特旗: {id: number}, 突泉县: {id: number}}}, 阿拉善盟: {id: number, areasArr: string[], areas: {阿拉善左旗: {id: number}, 阿拉善右旗: {id: number}, 额济纳旗: {id: number}}}}}, 辽宁省: {id: number, citiesArr: string[], cities: {沈阳市: {id: number, areasArr: string[], areas: {和平区: {id: number}, 沈河区: {id: number}, 大东区: {id: number}, 皇姑区: {id: number}, 铁西区: {id: number}, 苏家屯区: {id: number}, 东陵区: {id: number}, 沈北新区: {id: number}, 于洪区: {id: number}, 辽中县: {id: number}, 康平县: {id: number}, 法库县: {id: number}, 新民市: {id: number}, 市辖区: {id: number}}}, 铁岭市: {id: number, areasArr: string[], areas: {银州区: {id: number}, 清河区: {id: number}, 铁岭县: {id: number}, 西丰县: {id: number}, 昌图县: {id: number}, 调兵山市: {id: number}, 开原市: {id: number}, 市辖区: {id: number}}}, 大连市: {id: number, areasArr: string[], areas: {长海县: {id: number}, 旅顺口区: {id: number}, 中山区: {id: number}, 西岗区: {id: number}, 沙河口区: {id: number}, 甘井子区: {id: number}, 金州区: {id: number}, 普兰店市: {id: number}, 瓦房店市: {id: number}, 庄河市: {id: number}, 市辖区: {id: number}}}, 鞍山市: {id: number, areasArr: string[], areas: {铁东区: {id: number}, 铁西区: {id: number}, 立山区: {id: number}, 千山区: {id: number}, 台安县: {id: number}, 岫岩满族自治县: {id: number}, 海城市: {id: number}, 市辖区: {id: number}}}, 抚顺市: {id: number, areasArr: string[], areas: {新抚区: {id: number}, 东洲区: {id: number}, 望花区: {id: number}, 顺城区: {id: number}, 抚顺县: {id: number}, 新宾满族自治县: {id: number}, 清原满族自治县: {id: number}, 市辖区: {id: number}}}, 本溪市: {id: number, areasArr: string[], areas: {平山区: {id: number}, 溪湖区: {id: number}, 明山区: {id: number}, 南芬区: {id: number}, 本溪满族自治县: {id: number}, 桓仁满族自治县: {id: number}, 市辖区: {id: number}}}, 丹东市: {id: number, areasArr: string[], areas: {元宝区: {id: number}, 振兴区: {id: number}, 振安区: {id: number}, 宽甸满族自治县: {id: number}, 东港市: {id: number}, 凤城市: {id: number}, 市辖区: {id: number}}}, 锦州市: {id: number, areasArr: string[], areas: {古塔区: {id: number}, 凌河区: {id: number}, 太和区: {id: number}, 黑山县: {id: number}, 义县: {id: number}, 凌海市: {id: number}, 北镇市: {id: number}, 市辖区: {id: number}}}, 营口市: {id: number, areasArr: string[], areas: {站前区: {id: number}, 西市区: {id: number}, 鮁鱼圈区: {id: number}, 老边区: {id: number}, 盖州市: {id: number}, 大石桥市: {id: number}, 市辖区: {id: number}}}, 阜新市: {id: number, areasArr: string[], areas: {海州区: {id: number}, 新邱区: {id: number}, 太平区: {id: number}, 清河门区: {id: number}, 细河区: {id: number}, 阜新蒙古族自治县: {id: number}, 彰武县: {id: number}, 市辖区: {id: number}}}, 辽阳市: {id: number, areasArr: string[], areas: {白塔区: {id: number}, 文圣区: {id: number}, 宏伟区: {id: number}, 弓长岭区: {id: number}, 太子河区: {id: number}, 辽阳县: {id: number}, 灯塔市: {id: number}, 市辖区: {id: number}}}, 朝阳市: {id: number, areasArr: string[], areas: {双塔区: {id: number}, 龙城区: {id: number}, 朝阳县: {id: number}, 建平县: {id: number}, 喀喇沁左翼蒙古族自治县: {id: number}, 北票市: {id: number}, 凌源市: {id: number}, 市辖区: {id: number}}}, 盘锦市: {id: number, areasArr: string[], areas: {双台子区: {id: number}, 兴隆台区: {id: number}, 大洼县: {id: number}, 盘山县: {id: number}, 市辖区: {id: number}}}, 葫芦岛市: {id: number, areasArr: string[], areas: {连山区: {id: number}, 龙港区: {id: number}, 南票区: {id: number}, 绥中县: {id: number}, 建昌县: {id: number}, 兴城市: {id: number}, 市辖区: {id: number}}}}}, 吉林省: {id: number, citiesArr: string[], cities: {长春市: {id: number, areasArr: string[], areas: {南关区: {id: number}, 宽城区: {id: number}, 朝阳区: {id: number}, 二道区: {id: number}, 绿园区: {id: number}, 双阳区: {id: number}, 农安县: {id: number}, 九台市: {id: number}, 榆树市: {id: number}, 德惠市: {id: number}, 市辖区: {id: number}}}, 吉林市: {id: number, areasArr: string[], areas: {昌邑区: {id: number}, 龙潭区: {id: number}, 船营区: {id: number}, 丰满区: {id: number}, 永吉县: {id: number}, 蛟河市: {id: number}, 桦甸市: {id: number}, 舒兰市: {id: number}, 磐石市: {id: number}, 市辖区: {id: number}}}, 延边朝鲜族自治州: {id: number, areasArr: string[], areas: {延吉市: {id: number}, 图们市: {id: number}, 敦化市: {id: number}, 珲春市: {id: number}, 龙井市: {id: number}, 和龙市: {id: number}, 汪清县: {id: number}, 安图县: {id: number}}}, 四平市: {id: number, areasArr: string[], areas: {铁西区: {id: number}, 铁东区: {id: number}, 梨树县: {id: number}, 伊通满族自治县: {id: number}, 公主岭市: {id: number}, 双辽市: {id: number}, 市辖区: {id: number}}}, 通化市: {id: number, areasArr: string[], areas: {东昌区: {id: number}, 二道江区: {id: number}, 通化县: {id: number}, 辉南县: {id: number}, 柳河县: {id: number}, 梅河口市: {id: number}, 集安市: {id: number}, 市辖区: {id: number}}}, 白城市: {id: number, areasArr: string[], areas: {洮北区: {id: number}, 镇赉县: {id: number}, 通榆县: {id: number}, 洮南市: {id: number}, 大安市: {id: number}, 市辖区: {id: number}}}, 辽源市: {id: number, areasArr: string[], areas: {龙山区: {id: number}, 西安区: {id: number}, 东丰县: {id: number}, 东辽县: {id: number}, 市辖区: {id: number}}}, 松原市: {id: number, areasArr: string[], areas: {宁江区: {id: number}, 前郭尔罗斯蒙古族自治县: {id: number}, 长岭县: {id: number}, 乾安县: {id: number}, 扶余县: {id: number}, 市辖区: {id: number}}}, 白山市: {id: number, areasArr: string[], areas: {八道江区: {id: number}, 江源区: {id: number}, 抚松县: {id: number}, 靖宇县: {id: number}, 长白朝鲜族自治县: {id: number}, 临江市: {id: number}, 市辖区: {id: number}}}}}, 黑龙江省: {id: number, citiesArr: string[], cities: {哈尔滨市: {id: number, areasArr: string[], areas: {道里区: {id: number}, 南岗区: {id: number}, 道外区: {id: number}, 平房区: {id: number}, 松北区: {id: number}, 香坊区: {id: number}, 呼兰区: {id: number}, 阿城区: {id: number}, 依兰县: {id: number}, 方正县: {id: number}, 宾县: {id: number}, 巴彦县: {id: number}, 木兰县: {id: number}, 通河县: {id: number}, 延寿县: {id: number}, 双城市: {id: number}, 尚志市: {id: number}, 五常市: {id: number}, 市辖区: {id: number}}}, 齐齐哈尔市: {id: number, areasArr: string[], areas: {龙沙区: {id: number}, 建华区: {id: number}, 铁锋区: {id: number}, 昂昂溪区: {id: number}, 富拉尔基区: {id: number}, 碾子山区: {id: number}, 梅里斯达翰尔族区: {id: number}, 龙江县: {id: number}, 依安县: {id: number}, 泰来县: {id: number}, 甘南县: {id: number}, 富裕县: {id: number}, 克山县: {id: number}, 克东县: {id: number}, 拜泉县: {id: number}, 讷河市: {id: number}, 市辖区: {id: number}}}, 鸡西市: {id: number, areasArr: string[], areas: {鸡冠区: {id: number}, 恒山区: {id: number}, 滴道区: {id: number}, 梨树区: {id: number}, 城子河区: {id: number}, 麻山区: {id: number}, 鸡东县: {id: number}, 虎林市: {id: number}, 密山市: {id: number}, 市辖区: {id: number}}}, 牡丹江市: {id: number, areasArr: string[], areas: {东安区: {id: number}, 阳明区: {id: number}, 爱民区: {id: number}, 西安区: {id: number}, 东宁县: {id: number}, 林口县: {id: number}, 绥芬河市: {id: number}, 海林市: {id: number}, 宁安市: {id: number}, 穆棱市: {id: number}, 市辖区: {id: number}}}, 七台河市: {id: number, areasArr: string[], areas: {新兴区: {id: number}, 桃山区: {id: number}, 茄子河区: {id: number}, 勃利县: {id: number}, 市辖区: {id: number}}}, 佳木斯市: {id: number, areasArr: string[], areas: {向阳区: {id: number}, 前进区: {id: number}, 东风区: {id: number}, 桦南县: {id: number}, 桦川县: {id: number}, 汤原县: {id: number}, 抚远县: {id: number}, 同江市: {id: number}, 富锦市: {id: number}, 市辖区: {id: number}, 郊区: {id: number}}}, 鹤岗市: {id: number, areasArr: string[], areas: {向阳区: {id: number}, 工农区: {id: number}, 南山区: {id: number}, 兴安区: {id: number}, 东山区: {id: number}, 兴山区: {id: number}, 萝北县: {id: number}, 绥滨县: {id: number}, 市辖区: {id: number}}}, 双鸭山市: {id: number, areasArr: string[], areas: {尖山区: {id: number}, 岭东区: {id: number}, 四方台区: {id: number}, 宝山区: {id: number}, 集贤县: {id: number}, 友谊县: {id: number}, 宝清县: {id: number}, 饶河县: {id: number}, 市辖区: {id: number}}}, 绥化市: {id: number, areasArr: string[], areas: {北林区: {id: number}, 望奎县: {id: number}, 兰西县: {id: number}, 青冈县: {id: number}, 庆安县: {id: number}, 明水县: {id: number}, 绥棱县: {id: number}, 安达市: {id: number}, 肇东市: {id: number}, 海伦市: {id: number}, 市辖区: {id: number}}}, 黑河市: {id: number, areasArr: string[], areas: {爱辉区: {id: number}, 嫩江县: {id: number}, 逊克县: {id: number}, 孙吴县: {id: number}, 北安市: {id: number}, 五大连池市: {id: number}, 市辖区: {id: number}}}, 大兴安岭地区: {id: number, areasArr: string[], areas: {呼玛县: {id: number}, 塔河县: {id: number}, 漠河县: {id: number}, 加格达奇区: {id: number}, 松岭区: {id: number}, 新林区: {id: number}, 呼中区: {id: number}}}, 伊春市: {id: number, areasArr: string[], areas: {伊春区: {id: number}, 南岔区: {id: number}, 友好区: {id: number}, 西林区: {id: number}, 翠峦区: {id: number}, 新青区: {id: number}, 美溪区: {id: number}, 金山屯区: {id: number}, 五营区: {id: number}, 乌马河区: {id: number}, 汤旺河区: {id: number}, 带岭区: {id: number}, 乌伊岭区: {id: number}, 红星区: {id: number}, 上甘岭区: {id: number}, 嘉荫县: {id: number}, 铁力市: {id: number}, 市辖区: {id: number}}}, 大庆市: {id: number, areasArr: string[], areas: {萨尔图区: {id: number}, 龙凤区: {id: number}, 让胡路区: {id: number}, 红岗区: {id: number}, 大同区: {id: number}, 肇州县: {id: number}, 肇源县: {id: number}, 林甸县: {id: number}, 杜尔伯特蒙古族自治县: {id: number}, 市辖区: {id: number}}}}}, 上海市: {id: number, citiesArr: string[], cities: {上海市: {id: number, areasArr: string[], areas: {黄浦区: {id: number}, 卢湾区: {id: number}, 徐汇区: {id: number}, 长宁区: {id: number}, 静安区: {id: number}, 普陀区: {id: number}, 闸北区: {id: number}, 虹口区: {id: number}, 杨浦区: {id: number}, 闵行区: {id: number}, 宝山区: {id: number}, 嘉定区: {id: number}, 浦东新区: {id: number}, 金山区: {id: number}, 松江区: {id: number}, 青浦区: {id: number}, 南汇区: {id: number}, 奉贤区: {id: number}, 崇明县: {id: number}}}}}, 江苏省: {id: number, citiesArr: string[], cities: {南京市: {id: number, areasArr: string[], areas: {江宁区: {id: number}, 浦口区: {id: number}, 玄武区: {id: number}, 白下区: {id: number}, 秦淮区: {id: number}, 建邺区: {id: number}, 鼓楼区: {id: number}, 下关区: {id: number}, 栖霞区: {id: number}, 雨花台区: {id: number}, 六合区: {id: number}, 溧水县: {id: number}, 高淳县: {id: number}, 市辖区: {id: number}}}, 无锡市: {id: number, areasArr: string[], areas: {崇安区: {id: number}, 南长区: {id: number}, 北塘区: {id: number}, 锡山区: {id: number}, 惠山区: {id: number}, 滨湖区: {id: number}, 江阴市: {id: number}, 宜兴市: {id: number}, 市辖区: {id: number}}}, 镇江市: {id: number, areasArr: string[], areas: {京口区: {id: number}, 润州区: {id: number}, 丹徒区: {id: number}, 丹阳市: {id: number}, 扬中市: {id: number}, 句容市: {id: number}, 市辖区: {id: number}}}, 苏州市: {id: number, areasArr: string[], areas: {沧浪区: {id: number}, 常熟市: {id: number}, 平江区: {id: number}, 金阊区: {id: number}, 虎丘区: {id: number}, 昆山市: {id: number}, 太仓市: {id: number}, 吴江市: {id: number}, 吴中区: {id: number}, 相城区: {id: number}, 张家港市: {id: number}, 市辖区: {id: number}}}, 南通市: {id: number, areasArr: string[], areas: {崇川区: {id: number}, 港闸区: {id: number}, 海安县: {id: number}, 如东县: {id: number}, 启东市: {id: number}, 如皋市: {id: number}, 通州市: {id: number}, 海门市: {id: number}, 市辖区: {id: number}}}, 扬州市: {id: number, areasArr: string[], areas: {高邮市: {id: number}, 广陵区: {id: number}, 邗江区: {id: number}, 维扬区: {id: number}, 宝应县: {id: number}, 江都市: {id: number}, 仪征市: {id: number}, 市辖区: {id: number}}}, 盐城市: {id: number, areasArr: string[], areas: {亭湖区: {id: number}, 盐都区: {id: number}, 响水县: {id: number}, 滨海县: {id: number}, 阜宁县: {id: number}, 射阳县: {id: number}, 建湖县: {id: number}, 东台市: {id: number}, 大丰市: {id: number}, 市辖区: {id: number}}}, 徐州市: {id: number, areasArr: string[], areas: {鼓楼区: {id: number}, 云龙区: {id: number}, 九里区: {id: number}, 贾汪区: {id: number}, 泉山区: {id: number}, 丰县: {id: number}, 沛县: {id: number}, 铜山县: {id: number}, 睢宁县: {id: number}, 新沂市: {id: number}, 邳州市: {id: number}, 市辖区: {id: number}}}, 淮安市: {id: number, areasArr: string[], areas: {清河区: {id: number}, 楚州区: {id: number}, 淮阴区: {id: number}, 清浦区: {id: number}, 涟水县: {id: number}, 洪泽县: {id: number}, 盱眙县: {id: number}, 金湖县: {id: number}, 市辖区: {id: number}}}, 连云港市: {id: number, areasArr: string[], areas: {连云区: {id: number}, 新浦区: {id: number}, 海州区: {id: number}, 赣榆县: {id: number}, 东海县: {id: number}, 灌云县: {id: number}, 灌南县: {id: number}, 市辖区: {id: number}}}, 常州市: {id: number, areasArr: string[], areas: {天宁区: {id: number}, 钟楼区: {id: number}, 戚墅堰区: {id: number}, 新北区: {id: number}, 武进区: {id: number}, 溧阳市: {id: number}, 金坛市: {id: number}, 市辖区: {id: number}}}, 泰州市: {id: number, areasArr: string[], areas: {海陵区: {id: number}, 高港区: {id: number}, 兴化市: {id: number}, 靖江市: {id: number}, 泰兴市: {id: number}, 姜堰市: {id: number}, 市辖区: {id: number}}}, 宿迁市: {id: number, areasArr: string[], areas: {宿城区: {id: number}, 宿豫区: {id: number}, 沭阳县: {id: number}, 泗阳县: {id: number}, 泗洪县: {id: number}, 市辖区: {id: number}}}}}, 浙江省: {id: number, citiesArr: string[], cities: {舟山市: {id: number, areasArr: string[], areas: {定海区: {id: number}, 普陀区: {id: number}, 岱山县: {id: number}, 嵊泗县: {id: number}, 市辖区: {id: number}}}, 衢州市: {id: number, areasArr: string[], areas: {柯城区: {id: number}, 衢江区: {id: number}, 常山县: {id: number}, 开化县: {id: number}, 龙游县: {id: number}, 江山市: {id: number}, 市辖区: {id: number}}}, 杭州市: {id: number, areasArr: string[], areas: {上城区: {id: number}, 下城区: {id: number}, 江干区: {id: number}, 拱墅区: {id: number}, 西湖区: {id: number}, 滨江区: {id: number}, 余杭区: {id: number}, 桐庐县: {id: number}, 淳安县: {id: number}, 建德市: {id: number}, 富阳市: {id: number}, 临安市: {id: number}, 萧山区: {id: number}, 市辖区: {id: number}}}, 湖州市: {id: number, areasArr: string[], areas: {吴兴区: {id: number}, 南浔区: {id: number}, 德清县: {id: number}, 长兴县: {id: number}, 安吉县: {id: number}, 市辖区: {id: number}}}, 嘉兴市: {id: number, areasArr: string[], areas: {南湖区: {id: number}, 秀洲区: {id: number}, 嘉善县: {id: number}, 海盐县: {id: number}, 海宁市: {id: number}, 平湖市: {id: number}, 桐乡市: {id: number}, 市辖区: {id: number}}}, 宁波市: {id: number, areasArr: string[], areas: {海曙区: {id: number}, 江东区: {id: number}, 江北区: {id: number}, 北仑区: {id: number}, 镇海区: {id: number}, 鄞州区: {id: number}, 象山县: {id: number}, 宁海县: {id: number}, 余姚市: {id: number}, 慈溪市: {id: number}, 奉化市: {id: number}, 市辖区: {id: number}}}, 绍兴市: {id: number, areasArr: string[], areas: {越城区: {id: number}, 绍兴县: {id: number}, 新昌县: {id: number}, 诸暨市: {id: number}, 上虞市: {id: number}, 嵊州市: {id: number}, 市辖区: {id: number}}}, 温州市: {id: number, areasArr: string[], areas: {鹿城区: {id: number}, 龙湾区: {id: number}, 瓯海区: {id: number}, 洞头县: {id: number}, 永嘉县: {id: number}, 平阳县: {id: number}, 苍南县: {id: number}, 文成县: {id: number}, 泰顺县: {id: number}, 瑞安市: {id: number}, 乐清市: {id: number}, 市辖区: {id: number}}}, 丽水市: {id: number, areasArr: string[], areas: {莲都区: {id: number}, 青田县: {id: number}, 缙云县: {id: number}, 遂昌县: {id: number}, 松阳县: {id: number}, 云和县: {id: number}, 庆元县: {id: number}, 景宁畲族自治县: {id: number}, 龙泉市: {id: number}, 市辖区: {id: number}}}, 金华市: {id: number, areasArr: string[], areas: {婺城区: {id: number}, 金东区: {id: number}, 武义县: {id: number}, 浦江县: {id: number}, 磐安县: {id: number}, 兰溪市: {id: number}, 义乌市: {id: number}, 东阳市: {id: number}, 永康市: {id: number}, 市辖区: {id: number}}}, 台州市: {id: number, areasArr: string[], areas: {椒江区: {id: number}, 黄岩区: {id: number}, 路桥区: {id: number}, 玉环县: {id: number}, 三门县: {id: number}, 天台县: {id: number}, 仙居县: {id: number}, 温岭市: {id: number}, 临海市: {id: number}, 市辖区: {id: number}}}}}, 安徽省: {id: number, citiesArr: string[], cities: {合肥市: {id: number, areasArr: string[], areas: {瑶海区: {id: number}, 庐阳区: {id: number}, 蜀山区: {id: number}, 包河区: {id: number}, 长丰县: {id: number}, 肥东县: {id: number}, 肥西县: {id: number}, 市辖区: {id: number}}}, 芜湖市: {id: number, areasArr: string[], areas: {镜湖区: {id: number}, 弋江区: {id: number}, 鸠江区: {id: number}, 三山区: {id: number}, 芜湖县: {id: number}, 繁昌县: {id: number}, 南陵县: {id: number}, 市辖区: {id: number}}}, 蚌埠市: {id: number, areasArr: string[], areas: {龙子湖区: {id: number}, 蚌山区: {id: number}, 禹会区: {id: number}, 淮上区: {id: number}, 怀远县: {id: number}, 五河县: {id: number}, 固镇县: {id: number}, 市辖区: {id: number}}}, 淮南市: {id: number, areasArr: string[], areas: {大通区: {id: number}, 田家庵区: {id: number}, 谢家集区: {id: number}, 八公山区: {id: number}, 潘集区: {id: number}, 凤台县: {id: number}, 市辖区: {id: number}}}, 马鞍山市: {id: number, areasArr: string[], areas: {金家庄区: {id: number}, 花山区: {id: number}, 雨山区: {id: number}, 当涂县: {id: number}, 市辖区: {id: number}}}, 淮北市: {id: number, areasArr: string[], areas: {杜集区: {id: number}, 相山区: {id: number}, 烈山区: {id: number}, 濉溪县: {id: number}, 市辖区: {id: number}}}, 铜陵市: {id: number, areasArr: string[], areas: {铜官山区: {id: number}, 狮子山区: {id: number}, 铜陵县: {id: number}, 市辖区: {id: number}, 郊区: {id: number}}}, 安庆市: {id: number, areasArr: string[], areas: {迎江区: {id: number}, 大观区: {id: number}, 宜秀区: {id: number}, 怀宁县: {id: number}, 枞阳县: {id: number}, 潜山县: {id: number}, 太湖县: {id: number}, 宿松县: {id: number}, 望江县: {id: number}, 岳西县: {id: number}, 桐城市: {id: number}, 市辖区: {id: number}}}, 黄山市: {id: number, areasArr: string[], areas: {屯溪区: {id: number}, 黄山区: {id: number}, 徽州区: {id: number}, 歙县: {id: number}, 休宁县: {id: number}, 黟县: {id: number}, 祁门县: {id: number}, 市辖区: {id: number}}}, 滁州市: {id: number, areasArr: string[], areas: {琅琊区: {id: number}, 南谯区: {id: number}, 来安县: {id: number}, 全椒县: {id: number}, 定远县: {id: number}, 凤阳县: {id: number}, 天长市: {id: number}, 明光市: {id: number}, 市辖区: {id: number}}}, 阜阳市: {id: number, areasArr: string[], areas: {颍州区: {id: number}, 颍东区: {id: number}, 颍泉区: {id: number}, 临泉县: {id: number}, 太和县: {id: number}, 阜南县: {id: number}, 颍上县: {id: number}, 界首市: {id: number}, 市辖区: {id: number}}}, 宿州市: {id: number, areasArr: string[], areas: {埇桥区: {id: number}, 砀山县: {id: number}, 萧县: {id: number}, 灵璧县: {id: number}, 泗县: {id: number}, 市辖区: {id: number}}}, 巢湖市: {id: number, areasArr: string[], areas: {居巢区: {id: number}, 庐江县: {id: number}, 无为县: {id: number}, 含山县: {id: number}, 和县: {id: number}, 市辖区: {id: number}}}, 六安市: {id: number, areasArr: string[], areas: {金安区: {id: number}, 裕安区: {id: number}, 寿县: {id: number}, 霍邱县: {id: number}, 舒城县: {id: number}, 金寨县: {id: number}, 霍山县: {id: number}, 市辖区: {id: number}}}, 亳州市: {id: number, areasArr: string[], areas: {谯城区: {id: number}, 涡阳县: {id: number}, 蒙城县: {id: number}, 利辛县: {id: number}, 市辖区: {id: number}}}, 池州市: {id: number, areasArr: string[], areas: {贵池区: {id: number}, 东至县: {id: number}, 石台县: {id: number}, 青阳县: {id: number}, 市辖区: {id: number}}}, 宣城市: {id: number, areasArr: string[], areas: {宣州区: {id: number}, 郎溪县: {id: number}, 广德县: {id: number}, 泾县: {id: number}, 绩溪县: {id: number}, 旌德县: {id: number}, 宁国市: {id: number}, 市辖区: {id: number}}}}}, 福建省: {id: number, citiesArr: string[], cities: {福州市: {id: number, areasArr: string[], areas: {鼓楼区: {id: number}, 台江区: {id: number}, 仓山区: {id: number}, 马尾区: {id: number}, 晋安区: {id: number}, 闽侯县: {id: number}, 连江县: {id: number}, 罗源县: {id: number}, 闽清县: {id: number}, 永泰县: {id: number}, 平潭县: {id: number}, 福清市: {id: number}, 长乐市: {id: number}, 市辖区: {id: number}}}, 厦门市: {id: number, areasArr: string[], areas: {思明区: {id: number}, 海沧区: {id: number}, 湖里区: {id: number}, 集美区: {id: number}, 同安区: {id: number}, 翔安区: {id: number}, 市辖区: {id: number}}}, 宁德市: {id: number, areasArr: string[], areas: {蕉城区: {id: number}, 霞浦县: {id: number}, 古田县: {id: number}, 屏南县: {id: number}, 寿宁县: {id: number}, 周宁县: {id: number}, 柘荣县: {id: number}, 福安市: {id: number}, 福鼎市: {id: number}, 市辖区: {id: number}}}, 莆田市: {id: number, areasArr: string[], areas: {城厢区: {id: number}, 涵江区: {id: number}, 荔城区: {id: number}, 秀屿区: {id: number}, 仙游县: {id: number}, 市辖区: {id: number}}}, 泉州市: {id: number, areasArr: string[], areas: {鲤城区: {id: number}, 丰泽区: {id: number}, 洛江区: {id: number}, 泉港区: {id: number}, 惠安县: {id: number}, 安溪县: {id: number}, 永春县: {id: number}, 德化县: {id: number}, 石狮市: {id: number}, 晋江市: {id: number}, 南安市: {id: number}, 市辖区: {id: number}, 金门县: {id: number}}}, 漳州市: {id: number, areasArr: string[], areas: {芗城区: {id: number}, 龙文区: {id: number}, 云霄县: {id: number}, 漳浦县: {id: number}, 诏安县: {id: number}, 长泰县: {id: number}, 东山县: {id: number}, 南靖县: {id: number}, 平和县: {id: number}, 华安县: {id: number}, 龙海市: {id: number}, 市辖区: {id: number}}}, 龙岩市: {id: number, areasArr: string[], areas: {新罗区: {id: number}, 长汀县: {id: number}, 永定县: {id: number}, 上杭县: {id: number}, 武平县: {id: number}, 连城县: {id: number}, 漳平市: {id: number}, 市辖区: {id: number}}}, 三明市: {id: number, areasArr: string[], areas: {梅列区: {id: number}, 三元区: {id: number}, 明溪县: {id: number}, 清流县: {id: number}, 宁化县: {id: number}, 大田县: {id: number}, 尤溪县: {id: number}, 沙县: {id: number}, 将乐县: {id: number}, 泰宁县: {id: number}, 建宁县: {id: number}, 永安市: {id: number}, 市辖区: {id: number}}}, 南平市: {id: number, areasArr: string[], areas: {延平区: {id: number}, 顺昌县: {id: number}, 浦城县: {id: number}, 光泽县: {id: number}, 松溪县: {id: number}, 政和县: {id: number}, 邵武市: {id: number}, 武夷山市: {id: number}, 建瓯市: {id: number}, 建阳市: {id: number}, 市辖区: {id: number}}}}}, 江西省: {id: number, citiesArr: string[], cities: {鹰潭市: {id: number, areasArr: string[], areas: {月湖区: {id: number}, 余江县: {id: number}, 贵溪市: {id: number}, 市辖区: {id: number}}}, 新余市: {id: number, areasArr: string[], areas: {渝水区: {id: number}, 分宜县: {id: number}, 市辖区: {id: number}}}, 南昌市: {id: number, areasArr: string[], areas: {东湖区: {id: number}, 西湖区: {id: number}, 青云谱区: {id: number}, 湾里区: {id: number}, 青山湖区: {id: number}, 南昌县: {id: number}, 新建县: {id: number}, 安义县: {id: number}, 进贤县: {id: number}, 市辖区: {id: number}}}, 九江市: {id: number, areasArr: string[], areas: {庐山区: {id: number}, 浔阳区: {id: number}, 九江县: {id: number}, 武宁县: {id: number}, 修水县: {id: number}, 永修县: {id: number}, 德安县: {id: number}, 星子县: {id: number}, 都昌县: {id: number}, 湖口县: {id: number}, 彭泽县: {id: number}, 瑞昌市: {id: number}, 市辖区: {id: number}}}, 上饶市: {id: number, areasArr: string[], areas: {信州区: {id: number}, 上饶县: {id: number}, 广丰县: {id: number}, 玉山县: {id: number}, 铅山县: {id: number}, 横峰县: {id: number}, 弋阳县: {id: number}, 余干县: {id: number}, 鄱阳县: {id: number}, 万年县: {id: number}, 婺源县: {id: number}, 德兴市: {id: number}, 市辖区: {id: number}}}, 抚州市: {id: number, areasArr: string[], areas: {临川区: {id: number}, 南城县: {id: number}, 黎川县: {id: number}, 南丰县: {id: number}, 崇仁县: {id: number}, 乐安县: {id: number}, 宜黄县: {id: number}, 金溪县: {id: number}, 资溪县: {id: number}, 东乡县: {id: number}, 广昌县: {id: number}, 市辖区: {id: number}}}, 宜春市: {id: number, areasArr: string[], areas: {袁州区: {id: number}, 奉新县: {id: number}, 万载县: {id: number}, 上高县: {id: number}, 宜丰县: {id: number}, 靖安县: {id: number}, 铜鼓县: {id: number}, 丰城市: {id: number}, 樟树市: {id: number}, 高安市: {id: number}, 市辖区: {id: number}}}, 吉安市: {id: number, areasArr: string[], areas: {吉州区: {id: number}, 青原区: {id: number}, 吉安县: {id: number}, 吉水县: {id: number}, 峡江县: {id: number}, 新干县: {id: number}, 永丰县: {id: number}, 泰和县: {id: number}, 遂川县: {id: number}, 万安县: {id: number}, 安福县: {id: number}, 永新县: {id: number}, 井冈山市: {id: number}, 市辖区: {id: number}}}, 赣州市: {id: number, areasArr: string[], areas: {章贡区: {id: number}, 赣县: {id: number}, 信丰县: {id: number}, 大余县: {id: number}, 上犹县: {id: number}, 崇义县: {id: number}, 安远县: {id: number}, 龙南县: {id: number}, 定南县: {id: number}, 全南县: {id: number}, 宁都县: {id: number}, 于都县: {id: number}, 兴国县: {id: number}, 会昌县: {id: number}, 寻乌县: {id: number}, 石城县: {id: number}, 瑞金市: {id: number}, 南康市: {id: number}, 市辖区: {id: number}}}, 景德镇市: {id: number, areasArr: string[], areas: {昌江区: {id: number}, 珠山区: {id: number}, 浮梁县: {id: number}, 乐平市: {id: number}, 市辖区: {id: number}}}, 萍乡市: {id: number, areasArr: string[], areas: {安源区: {id: number}, 湘东区: {id: number}, 莲花县: {id: number}, 上栗县: {id: number}, 芦溪县: {id: number}, 市辖区: {id: number}}}}}, 山东省: {id: number, citiesArr: string[], cities: {菏泽市: {id: number, areasArr: string[], areas: {牡丹区: {id: number}, 曹县: {id: number}, 单县: {id: number}, 成武县: {id: number}, 巨野县: {id: number}, 郓城县: {id: number}, 鄄城县: {id: number}, 定陶县: {id: number}, 东明县: {id: number}, 市辖区: {id: number}}}, 济南市: {id: number, areasArr: string[], areas: {历下区: {id: number}, 市中区: {id: number}, 槐荫区: {id: number}, 天桥区: {id: number}, 历城区: {id: number}, 长清区: {id: number}, 平阴县: {id: number}, 济阳县: {id: number}, 商河县: {id: number}, 章丘市: {id: number}, 市辖区: {id: number}}}, 青岛市: {id: number, areasArr: string[], areas: {市南区: {id: number}, 市北区: {id: number}, 四方区: {id: number}, 黄岛区: {id: number}, 崂山区: {id: number}, 李沧区: {id: number}, 城阳区: {id: number}, 胶州市: {id: number}, 即墨市: {id: number}, 平度市: {id: number}, 胶南市: {id: number}, 莱西市: {id: number}, 市辖区: {id: number}}}, 淄博市: {id: number, areasArr: string[], areas: {淄川区: {id: number}, 张店区: {id: number}, 博山区: {id: number}, 临淄区: {id: number}, 周村区: {id: number}, 桓台县: {id: number}, 高青县: {id: number}, 沂源县: {id: number}, 市辖区: {id: number}}}, 德州市: {id: number, areasArr: string[], areas: {德城区: {id: number}, 陵县: {id: number}, 宁津县: {id: number}, 庆云县: {id: number}, 临邑县: {id: number}, 齐河县: {id: number}, 平原县: {id: number}, 夏津县: {id: number}, 武城县: {id: number}, 乐陵市: {id: number}, 禹城市: {id: number}, 市辖区: {id: number}}}, 烟台市: {id: number, areasArr: string[], areas: {芝罘区: {id: number}, 福山区: {id: number}, 牟平区: {id: number}, 莱山区: {id: number}, 长岛县: {id: number}, 龙口市: {id: number}, 莱阳市: {id: number}, 莱州市: {id: number}, 蓬莱市: {id: number}, 招远市: {id: number}, 栖霞市: {id: number}, 海阳市: {id: number}, 市辖区: {id: number}}}, 潍坊市: {id: number, areasArr: string[], areas: {潍城区: {id: number}, 寒亭区: {id: number}, 坊子区: {id: number}, 奎文区: {id: number}, 临朐县: {id: number}, 昌乐县: {id: number}, 青州市: {id: number}, 诸城市: {id: number}, 寿光市: {id: number}, 安丘市: {id: number}, 高密市: {id: number}, 昌邑市: {id: number}, 市辖区: {id: number}}}, 济宁市: {id: number, areasArr: string[], areas: {市中区: {id: number}, 任城区: {id: number}, 微山县: {id: number}, 鱼台县: {id: number}, 金乡县: {id: number}, 嘉祥县: {id: number}, 汶上县: {id: number}, 泗水县: {id: number}, 梁山县: {id: number}, 曲阜市: {id: number}, 兖州市: {id: number}, 邹城市: {id: number}, 市辖区: {id: number}}}, 泰安市: {id: number, areasArr: string[], areas: {泰山区: {id: number}, 岱岳区: {id: number}, 宁阳县: {id: number}, 东平县: {id: number}, 新泰市: {id: number}, 肥城市: {id: number}, 市辖区: {id: number}}}, 临沂市: {id: number, areasArr: string[], areas: {兰山区: {id: number}, 罗庄区: {id: number}, 河东区: {id: number}, 沂南县: {id: number}, 郯城县: {id: number}, 沂水县: {id: number}, 苍山县: {id: number}, 费县: {id: number}, 平邑县: {id: number}, 莒南县: {id: number}, 蒙阴县: {id: number}, 临沭县: {id: number}, 市辖区: {id: number}}}, 滨州市: {id: number, areasArr: string[], areas: {滨城区: {id: number}, 惠民县: {id: number}, 阳信县: {id: number}, 无棣县: {id: number}, 沾化县: {id: number}, 博兴县: {id: number}, 邹平县: {id: number}, 市辖区: {id: number}}}, 东营市: {id: number, areasArr: string[], areas: {东营区: {id: number}, 河口区: {id: number}, 垦利县: {id: number}, 利津县: {id: number}, 广饶县: {id: number}, 市辖区: {id: number}}}, 威海市: {id: number, areasArr: string[], areas: {环翠区: {id: number}, 文登市: {id: number}, 荣成市: {id: number}, 乳山市: {id: number}, 市辖区: {id: number}}}, 枣庄市: {id: number, areasArr: string[], areas: {市中区: {id: number}, 薛城区: {id: number}, 峄城区: {id: number}, 台儿庄区: {id: number}, 山亭区: {id: number}, 滕州市: {id: number}, 市辖区: {id: number}}}, 日照市: {id: number, areasArr: string[], areas: {东港区: {id: number}, 岚山区: {id: number}, 五莲县: {id: number}, 莒县: {id: number}, 市辖区: {id: number}}}, 莱芜市: {id: number, areasArr: string[], areas: {莱城区: {id: number}, 钢城区: {id: number}, 市辖区: {id: number}}}, 聊城市: {id: number, areasArr: string[], areas: {东昌府区: {id: number}, 阳谷县: {id: number}, 莘县: {id: number}, 茌平县: {id: number}, 东阿县: {id: number}, 冠县: {id: number}, 高唐县: {id: number}, 临清市: {id: number}, 市辖区: {id: number}}}}}, 河南省: {id: number, citiesArr: string[], cities: {商丘市: {id: number, areasArr: string[], areas: {梁园区: {id: number}, 睢阳区: {id: number}, 民权县: {id: number}, 睢县: {id: number}, 宁陵县: {id: number}, 柘城县: {id: number}, 虞城县: {id: number}, 夏邑县: {id: number}, 永城市: {id: number}, 市辖区: {id: number}}}, 郑州市: {id: number, areasArr: string[], areas: {中原区: {id: number}, 二七区: {id: number}, 管城回族区: {id: number}, 金水区: {id: number}, 上街区: {id: number}, 惠济区: {id: number}, 中牟县: {id: number}, 巩义市: {id: number}, 荥阳市: {id: number}, 新密市: {id: number}, 新郑市: {id: number}, 登封市: {id: number}, 市辖区: {id: number}}}, 安阳市: {id: number, areasArr: string[], areas: {文峰区: {id: number}, 北关区: {id: number}, 殷都区: {id: number}, 龙安区: {id: number}, 安阳县: {id: number}, 汤阴县: {id: number}, 滑县: {id: number}, 内黄县: {id: number}, 林州市: {id: number}, 市辖区: {id: number}}}, 新乡市: {id: number, areasArr: string[], areas: {红旗区: {id: number}, 卫滨区: {id: number}, 凤泉区: {id: number}, 牧野区: {id: number}, 新乡县: {id: number}, 获嘉县: {id: number}, 原阳县: {id: number}, 延津县: {id: number}, 封丘县: {id: number}, 长垣县: {id: number}, 卫辉市: {id: number}, 辉县市: {id: number}, 市辖区: {id: number}}}, 许昌市: {id: number, areasArr: string[], areas: {魏都区: {id: number}, 许昌县: {id: number}, 鄢陵县: {id: number}, 襄城县: {id: number}, 禹州市: {id: number}, 长葛市: {id: number}, 市辖区: {id: number}}}, 平顶山市: {id: number, areasArr: string[], areas: {新华区: {id: number}, 卫东区: {id: number}, 石龙区: {id: number}, 湛河区: {id: number}, 宝丰县: {id: number}, 叶县: {id: number}, 鲁山县: {id: number}, 郏县: {id: number}, 舞钢市: {id: number}, 汝州市: {id: number}, 市辖区: {id: number}}}, 信阳市: {id: number, areasArr: string[], areas: {浉河区: {id: number}, 平桥区: {id: number}, 罗山县: {id: number}, 光山县: {id: number}, 新县: {id: number}, 商城县: {id: number}, 固始县: {id: number}, 潢川县: {id: number}, 淮滨县: {id: number}, 息县: {id: number}, 市辖区: {id: number}}}, 南阳市: {id: number, areasArr: string[], areas: {宛城区: {id: number}, 卧龙区: {id: number}, 南召县: {id: number}, 方城县: {id: number}, 西峡县: {id: number}, 镇平县: {id: number}, 内乡县: {id: number}, 淅川县: {id: number}, 社旗县: {id: number}, 唐河县: {id: number}, 新野县: {id: number}, 桐柏县: {id: number}, 邓州市: {id: number}, 市辖区: {id: number}}}, 开封市: {id: number, areasArr: string[], areas: {龙亭区: {id: number}, 顺河回族区: {id: number}, 鼓楼区: {id: number}, 禹王台区: {id: number}, 金明区: {id: number}, 杞县: {id: number}, 通许县: {id: number}, 尉氏县: {id: number}, 开封县: {id: number}, 兰考县: {id: number}, 市辖区: {id: number}}}, 洛阳市: {id: number, areasArr: string[], areas: {老城区: {id: number}, 西工区: {id: number}, 瀍河回族区: {id: number}, 涧西区: {id: number}, 吉利区: {id: number}, 洛龙区: {id: number}, 孟津县: {id: number}, 新安县: {id: number}, 栾川县: {id: number}, 嵩县: {id: number}, 汝阳县: {id: number}, 宜阳县: {id: number}, 洛宁县: {id: number}, 伊川县: {id: number}, 偃师市: {id: number}, 市辖区: {id: number}}}, 省直辖县级行政区划: {id: number, areasArr: string[], areas: {济源市: {id: number}}}, 焦作市: {id: number, areasArr: string[], areas: {解放区: {id: number}, 中站区: {id: number}, 马村区: {id: number}, 山阳区: {id: number}, 修武县: {id: number}, 博爱县: {id: number}, 武陟县: {id: number}, 温县: {id: number}, 沁阳市: {id: number}, 孟州市: {id: number}, 市辖区: {id: number}}}, 鹤壁市: {id: number, areasArr: string[], areas: {鹤山区: {id: number}, 山城区: {id: number}, 淇滨区: {id: number}, 浚县: {id: number}, 淇县: {id: number}, 市辖区: {id: number}}}, 濮阳市: {id: number, areasArr: string[], areas: {华龙区: {id: number}, 清丰县: {id: number}, 南乐县: {id: number}, 范县: {id: number}, 台前县: {id: number}, 濮阳县: {id: number}, 市辖区: {id: number}}}, 周口市: {id: number, areasArr: string[], areas: {川汇区: {id: number}, 扶沟县: {id: number}, 西华县: {id: number}, 商水县: {id: number}, 沈丘县: {id: number}, 郸城县: {id: number}, 淮阳县: {id: number}, 太康县: {id: number}, 鹿邑县: {id: number}, 项城市: {id: number}, 市辖区: {id: number}}}, 漯河市: {id: number, areasArr: string[], areas: {源汇区: {id: number}, 郾城区: {id: number}, 召陵区: {id: number}, 舞阳县: {id: number}, 临颍县: {id: number}, 市辖区: {id: number}}}, 驻马店市: {id: number, areasArr: string[], areas: {驿城区: {id: number}, 西平县: {id: number}, 上蔡县: {id: number}, 平舆县: {id: number}, 正阳县: {id: number}, 确山县: {id: number}, 泌阳县: {id: number}, 汝南县: {id: number}, 遂平县: {id: number}, 新蔡县: {id: number}, 市辖区: {id: number}}}, 三门峡市: {id: number, areasArr: string[], areas: {湖滨区: {id: number}, 渑池县: {id: number}, 陕县: {id: number}, 卢氏县: {id: number}, 义马市: {id: number}, 灵宝市: {id: number}, 市辖区: {id: number}}}}}, 湖北省: {id: number, citiesArr: string[], cities: {武汉市: {id: number, areasArr: string[], areas: {江岸区: {id: number}, 江汉区: {id: number}, 硚口区: {id: number}, 汉阳区: {id: number}, 武昌区: {id: number}, 青山区: {id: number}, 洪山区: {id: number}, 东西湖区: {id: number}, 汉南区: {id: number}, 蔡甸区: {id: number}, 江夏区: {id: number}, 黄陂区: {id: number}, 新洲区: {id: number}, 市辖区: {id: number}}}, 襄樊市: {id: number, areasArr: string[], areas: {襄城区: {id: number}, 樊城区: {id: number}, 襄阳区: {id: number}, 南漳县: {id: number}, 谷城县: {id: number}, 保康县: {id: number}, 老河口市: {id: number}, 枣阳市: {id: number}, 宜城市: {id: number}, 市辖区: {id: number}}}, 鄂州市: {id: number, areasArr: string[], areas: {梁子湖区: {id: number}, 华容区: {id: number}, 鄂城区: {id: number}, 市辖区: {id: number}}}, 孝感市: {id: number, areasArr: string[], areas: {孝南区: {id: number}, 孝昌县: {id: number}, 大悟县: {id: number}, 云梦县: {id: number}, 应城市: {id: number}, 安陆市: {id: number}, 汉川市: {id: number}, 市辖区: {id: number}}}, 黄冈市: {id: number, areasArr: string[], areas: {黄州区: {id: number}, 团风县: {id: number}, 红安县: {id: number}, 罗田县: {id: number}, 英山县: {id: number}, 浠水县: {id: number}, 蕲春县: {id: number}, 黄梅县: {id: number}, 麻城市: {id: number}, 武穴市: {id: number}, 市辖区: {id: number}}}, 黄石市: {id: number, areasArr: string[], areas: {黄石港区: {id: number}, 西塞山区: {id: number}, 下陆区: {id: number}, 铁山区: {id: number}, 阳新县: {id: number}, 大冶市: {id: number}, 市辖区: {id: number}}}, 咸宁市: {id: number, areasArr: string[], areas: {咸安区: {id: number}, 嘉鱼县: {id: number}, 通城县: {id: number}, 崇阳县: {id: number}, 通山县: {id: number}, 赤壁市: {id: number}, 市辖区: {id: number}}}, 荆州市: {id: number, areasArr: string[], areas: {沙市区: {id: number}, 荆州区: {id: number}, 公安县: {id: number}, 监利县: {id: number}, 江陵县: {id: number}, 石首市: {id: number}, 洪湖市: {id: number}, 松滋市: {id: number}, 市辖区: {id: number}}}, 宜昌市: {id: number, areasArr: string[], areas: {西陵区: {id: number}, 伍家岗区: {id: number}, 点军区: {id: number}, 猇亭区: {id: number}, 夷陵区: {id: number}, 远安县: {id: number}, 兴山县: {id: number}, 秭归县: {id: number}, 长阳土家族自治县: {id: number}, 五峰土家族自治县: {id: number}, 宜都市: {id: number}, 当阳市: {id: number}, 枝江市: {id: number}, 市辖区: {id: number}}}, 恩施土家族苗族自治州: {id: number, areasArr: string[], areas: {恩施市: {id: number}, 利川市: {id: number}, 建始县: {id: number}, 巴东县: {id: number}, 宣恩县: {id: number}, 咸丰县: {id: number}, 来凤县: {id: number}, 鹤峰县: {id: number}}}, 十堰市: {id: number, areasArr: string[], areas: {茅箭区: {id: number}, 张湾区: {id: number}, 郧县: {id: number}, 郧西县: {id: number}, 竹山县: {id: number}, 竹溪县: {id: number}, 房县: {id: number}, 丹江口市: {id: number}, 市辖区: {id: number}}}, 随州市: {id: number, areasArr: string[], areas: {曾都区: {id: number}, 广水市: {id: number}, 市辖区: {id: number}}}, 荆门市: {id: number, areasArr: string[], areas: {东宝区: {id: number}, 掇刀区: {id: number}, 京山县: {id: number}, 沙洋县: {id: number}, 钟祥市: {id: number}, 市辖区: {id: number}}}, 省直辖县级行政区划: {id: number, areasArr: string[], areas: {仙桃市: {id: number}, 潜江市: {id: number}, 天门市: {id: number}, 神农架林区: {id: number}}}}}, 湖南省: {id: number, citiesArr: string[], cities: {岳阳市: {id: number, areasArr: string[], areas: {岳阳楼区: {id: number}, 云溪区: {id: number}, 君山区: {id: number}, 岳阳县: {id: number}, 华容县: {id: number}, 湘阴县: {id: number}, 平江县: {id: number}, 汨罗市: {id: number}, 临湘市: {id: number}, 市辖区: {id: number}}}, 长沙市: {id: number, areasArr: string[], areas: {芙蓉区: {id: number}, 天心区: {id: number}, 岳麓区: {id: number}, 开福区: {id: number}, 雨花区: {id: number}, 长沙县: {id: number}, 望城县: {id: number}, 宁乡县: {id: number}, 浏阳市: {id: number}, 市辖区: {id: number}}}, 湘潭市: {id: number, areasArr: string[], areas: {雨湖区: {id: number}, 岳塘区: {id: number}, 湘潭县: {id: number}, 湘乡市: {id: number}, 韶山市: {id: number}, 市辖区: {id: number}}}, 株洲市: {id: number, areasArr: string[], areas: {荷塘区: {id: number}, 芦淞区: {id: number}, 石峰区: {id: number}, 天元区: {id: number}, 株洲县: {id: number}, 攸县: {id: number}, 茶陵县: {id: number}, 炎陵县: {id: number}, 醴陵市: {id: number}, 市辖区: {id: number}}}, 衡阳市: {id: number, areasArr: string[], areas: {珠晖区: {id: number}, 雁峰区: {id: number}, 石鼓区: {id: number}, 蒸湘区: {id: number}, 南岳区: {id: number}, 衡阳县: {id: number}, 衡南县: {id: number}, 衡山县: {id: number}, 衡东县: {id: number}, 祁东县: {id: number}, 耒阳市: {id: number}, 常宁市: {id: number}, 市辖区: {id: number}}}, 郴州市: {id: number, areasArr: string[], areas: {北湖区: {id: number}, 苏仙区: {id: number}, 桂阳县: {id: number}, 宜章县: {id: number}, 永兴县: {id: number}, 嘉禾县: {id: number}, 临武县: {id: number}, 汝城县: {id: number}, 桂东县: {id: number}, 安仁县: {id: number}, 资兴市: {id: number}, 市辖区: {id: number}}}, 常德市: {id: number, areasArr: string[], areas: {武陵区: {id: number}, 鼎城区: {id: number}, 安乡县: {id: number}, 汉寿县: {id: number}, 澧县: {id: number}, 临澧县: {id: number}, 桃源县: {id: number}, 石门县: {id: number}, 津市市: {id: number}, 市辖区: {id: number}}}, 益阳市: {id: number, areasArr: string[], areas: {资阳区: {id: number}, 赫山区: {id: number}, 南县: {id: number}, 桃江县: {id: number}, 安化县: {id: number}, 沅江市: {id: number}, 市辖区: {id: number}}}, 娄底市: {id: number, areasArr: string[], areas: {娄星区: {id: number}, 双峰县: {id: number}, 新化县: {id: number}, 冷水江市: {id: number}, 涟源市: {id: number}, 市辖区: {id: number}}}, 邵阳市: {id: number, areasArr: string[], areas: {双清区: {id: number}, 大祥区: {id: number}, 北塔区: {id: number}, 邵东县: {id: number}, 新邵县: {id: number}, 邵阳县: {id: number}, 隆回县: {id: number}, 洞口县: {id: number}, 绥宁县: {id: number}, 新宁县: {id: number}, 城步苗族自治县: {id: number}, 武冈市: {id: number}, 市辖区: {id: number}}}, 湘西土家族苗族自治州: {id: number, areasArr: string[], areas: {吉首市: {id: number}, 泸溪县: {id: number}, 凤凰县: {id: number}, 花垣县: {id: number}, 保靖县: {id: number}, 古丈县: {id: number}, 永顺县: {id: number}, 龙山县: {id: number}}}, 张家界市: {id: number, areasArr: string[], areas: {永定区: {id: number}, 武陵源区: {id: number}, 慈利县: {id: number}, 桑植县: {id: number}, 市辖区: {id: number}}}, 怀化市: {id: number, areasArr: string[], areas: {鹤城区: {id: number}, 中方县: {id: number}, 沅陵县: {id: number}, 辰溪县: {id: number}, 溆浦县: {id: number}, 会同县: {id: number}, 麻阳苗族自治县: {id: number}, 新晃侗族自治县: {id: number}, 芷江侗族自治县: {id: number}, 靖州苗族侗族自治县: {id: number}, 通道侗族自治县: {id: number}, 洪江市: {id: number}, 市辖区: {id: number}}}, 永州市: {id: number, areasArr: string[], areas: {零陵区: {id: number}, 冷水滩区: {id: number}, 祁阳县: {id: number}, 东安县: {id: number}, 双牌县: {id: number}, 道县: {id: number}, 江永县: {id: number}, 宁远县: {id: number}, 蓝山县: {id: number}, 新田县: {id: number}, 江华瑶族自治县: {id: number}, 市辖区: {id: number}}}}}, 广东省: {id: number, citiesArr: string[], cities: {广州市: {id: number, areasArr: string[], areas: {从化市: {id: number}, 荔湾区: {id: number}, 越秀区: {id: number}, 海珠区: {id: number}, 天河区: {id: number}, 白云区: {id: number}, 花都区: {id: number}, 黄埔区: {id: number}, 萝岗区: {id: number}, 南沙区: {id: number}, 番禺区: {id: number}, 增城市: {id: number}, 市辖区: {id: number}}}, 汕尾市: {id: number, areasArr: string[], areas: {海丰县: {id: number}, 陆河县: {id: number}, 陆丰市: {id: number}, 市辖区: {id: number}, 城区: {id: number}}}, 阳江市: {id: number, areasArr: string[], areas: {江城区: {id: number}, 阳西县: {id: number}, 阳东县: {id: number}, 阳春市: {id: number}, 市辖区: {id: number}}}, 揭阳市: {id: number, areasArr: string[], areas: {榕城区: {id: number}, 揭东县: {id: number}, 揭西县: {id: number}, 惠来县: {id: number}, 普宁市: {id: number}, 市辖区: {id: number}}}, 茂名市: {id: number, areasArr: string[], areas: {茂南区: {id: number}, 茂港区: {id: number}, 电白县: {id: number}, 高州市: {id: number}, 化州市: {id: number}, 信宜市: {id: number}, 市辖区: {id: number}}}, 惠州市: {id: number, areasArr: string[], areas: {惠城区: {id: number}, 惠阳区: {id: number}, 博罗县: {id: number}, 惠东县: {id: number}, 龙门县: {id: number}, 市辖区: {id: number}}}, 江门市: {id: number, areasArr: string[], areas: {蓬江区: {id: number}, 江海区: {id: number}, 新会区: {id: number}, 台山市: {id: number}, 开平市: {id: number}, 鹤山市: {id: number}, 恩平市: {id: number}, 市辖区: {id: number}}}, 韶关市: {id: number, areasArr: string[], areas: {武江区: {id: number}, 浈江区: {id: number}, 曲江区: {id: number}, 始兴县: {id: number}, 仁化县: {id: number}, 翁源县: {id: number}, 乳源瑶族自治县: {id: number}, 新丰县: {id: number}, 乐昌市: {id: number}, 南雄市: {id: number}, 市辖区: {id: number}}}, 梅州市: {id: number, areasArr: string[], areas: {梅江区: {id: number}, 梅县: {id: number}, 大埔县: {id: number}, 丰顺县: {id: number}, 五华县: {id: number}, 平远县: {id: number}, 蕉岭县: {id: number}, 兴宁市: {id: number}, 市辖区: {id: number}}}, 汕头市: {id: number, areasArr: string[], areas: {龙湖区: {id: number}, 金平区: {id: number}, 濠江区: {id: number}, 潮阳区: {id: number}, 潮南区: {id: number}, 澄海区: {id: number}, 南澳县: {id: number}, 市辖区: {id: number}}}, 深圳市: {id: number, areasArr: string[], areas: {罗湖区: {id: number}, 福田区: {id: number}, 南山区: {id: number}, 宝安区: {id: number}, 龙岗区: {id: number}, 盐田区: {id: number}, 市辖区: {id: number}}}, 珠海市: {id: number, areasArr: string[], areas: {香洲区: {id: number}, 斗门区: {id: number}, 金湾区: {id: number}, 市辖区: {id: number}}}, 佛山市: {id: number, areasArr: string[], areas: {禅城区: {id: number}, 南海区: {id: number}, 顺德区: {id: number}, 三水区: {id: number}, 高明区: {id: number}, 市辖区: {id: number}}}, 肇庆市: {id: number, areasArr: string[], areas: {端州区: {id: number}, 鼎湖区: {id: number}, 广宁县: {id: number}, 怀集县: {id: number}, 封开县: {id: number}, 德庆县: {id: number}, 高要市: {id: number}, 四会市: {id: number}, 市辖区: {id: number}}}, 湛江市: {id: number, areasArr: string[], areas: {赤坎区: {id: number}, 霞山区: {id: number}, 坡头区: {id: number}, 麻章区: {id: number}, 遂溪县: {id: number}, 徐闻县: {id: number}, 廉江市: {id: number}, 雷州市: {id: number}, 吴川市: {id: number}, 市辖区: {id: number}}}, 中山市: {id: number, areasArr: Array, areas: {}}, 河源市: {id: number, areasArr: string[], areas: {源城区: {id: number}, 紫金县: {id: number}, 龙川县: {id: number}, 连平县: {id: number}, 和平县: {id: number}, 东源县: {id: number}, 市辖区: {id: number}}}, 清远市: {id: number, areasArr: string[], areas: {清城区: {id: number}, 佛冈县: {id: number}, 阳山县: {id: number}, 连山壮族瑶族自治县: {id: number}, 连南瑶族自治县: {id: number}, 清新县: {id: number}, 英德市: {id: number}, 连州市: {id: number}, 市辖区: {id: number}}}, 云浮市: {id: number, areasArr: string[], areas: {云城区: {id: number}, 新兴县: {id: number}, 郁南县: {id: number}, 云安县: {id: number}, 罗定市: {id: number}, 市辖区: {id: number}}}, 潮州市: {id: number, areasArr: string[], areas: {湘桥区: {id: number}, 潮安县: {id: number}, 饶平县: {id: number}, 市辖区: {id: number}}}, 东莞市: {id: number, areasArr: Array, areas: {}}}}, 海南省: {id: number, citiesArr: string[], cities: {海口市: {id: number, areasArr: string[], areas: {秀英区: {id: number}, 龙华区: {id: number}, 琼山区: {id: number}, 美兰区: {id: number}, 市辖区: {id: number}}}, 三亚市: {id: number, areasArr: string[], areas: {市辖区: {id: number}}}, 省直辖县级行政区划: {id: number, areasArr: string[], areas: {五指山市: {id: number}, 琼海市: {id: number}, 儋州市: {id: number}, 文昌市: {id: number}, 万宁市: {id: number}, 东方市: {id: number}, 定安县: {id: number}, 屯昌县: {id: number}, 澄迈县: {id: number}, 临高县: {id: number}, 白沙黎族自治县: {id: number}, 昌江黎族自治县: {id: number}, 乐东黎族自治县: {id: number}, 陵水黎族自治县: {id: number}, 保亭黎族苗族自治县: {id: number}, 琼中黎族苗族自治县: {id: number}, 西沙群岛: {id: number}, 南沙群岛: {id: number}, 中沙群岛的岛礁及其海域: {id: number}}}}}, 广西壮族自治区: {id: number, citiesArr: string[], cities: {防城港市: {id: number, areasArr: string[], areas: {港口区: {id: number}, 防城区: {id: number}, 上思县: {id: number}, 东兴市: {id: number}, 市辖区: {id: number}}}, 南宁市: {id: number, areasArr: string[], areas: {兴宁区: {id: number}, 青秀区: {id: number}, 江南区: {id: number}, 西乡塘区: {id: number}, 良庆区: {id: number}, 邕宁区: {id: number}, 武鸣县: {id: number}, 隆安县: {id: number}, 马山县: {id: number}, 上林县: {id: number}, 宾阳县: {id: number}, 横县: {id: number}, 市辖区: {id: number}}}, 崇左市: {id: number, areasArr: string[], areas: {江洲区: {id: number}, 扶绥县: {id: number}, 宁明县: {id: number}, 龙州县: {id: number}, 大新县: {id: number}, 天等县: {id: number}, 凭祥市: {id: number}, 市辖区: {id: number}}}, 来宾市: {id: number, areasArr: string[], areas: {兴宾区: {id: number}, 忻城县: {id: number}, 象州县: {id: number}, 武宣县: {id: number}, 金秀瑶族自治县: {id: number}, 合山市: {id: number}, 市辖区: {id: number}}}, 柳州市: {id: number, areasArr: string[], areas: {城中区: {id: number}, 鱼峰区: {id: number}, 柳南区: {id: number}, 柳北区: {id: number}, 柳江县: {id: number}, 柳城县: {id: number}, 鹿寨县: {id: number}, 融安县: {id: number}, 融水苗族自治县: {id: number}, 三江侗族自治县: {id: number}, 市辖区: {id: number}}}, 桂林市: {id: number, areasArr: string[], areas: {秀峰区: {id: number}, 叠彩区: {id: number}, 象山区: {id: number}, 七星区: {id: number}, 雁山区: {id: number}, 阳朔县: {id: number}, 临桂县: {id: number}, 灵川县: {id: number}, 全州县: {id: number}, 兴安县: {id: number}, 永福县: {id: number}, 灌阳县: {id: number}, 龙胜各族自治县: {id: number}, 资源县: {id: number}, 平乐县: {id: number}, 荔浦县: {id: number}, 恭城瑶族自治县: {id: number}, 市辖区: {id: number}}}, 梧州市: {id: number, areasArr: string[], areas: {万秀区: {id: number}, 碟山区: {id: number}, 长洲区: {id: number}, 苍梧县: {id: number}, 藤县: {id: number}, 蒙山县: {id: number}, 岑溪市: {id: number}, 市辖区: {id: number}}}, 贺州市: {id: number, areasArr: string[], areas: {八步区: {id: number}, 昭平县: {id: number}, 钟山县: {id: number}, 富川瑶族自治县: {id: number}, 市辖区: {id: number}}}, 贵港市: {id: number, areasArr: string[], areas: {港北区: {id: number}, 港南区: {id: number}, 覃塘区: {id: number}, 平南县: {id: number}, 桂平市: {id: number}, 市辖区: {id: number}}}, 玉林市: {id: number, areasArr: string[], areas: {玉州区: {id: number}, 容县: {id: number}, 陆川县: {id: number}, 博白县: {id: number}, 兴业县: {id: number}, 北流市: {id: number}, 市辖区: {id: number}}}, 百色市: {id: number, areasArr: string[], areas: {右江区: {id: number}, 田阳县: {id: number}, 田东县: {id: number}, 平果县: {id: number}, 德保县: {id: number}, 靖西县: {id: number}, 那坡县: {id: number}, 凌云县: {id: number}, 乐业县: {id: number}, 田林县: {id: number}, 西林县: {id: number}, 隆林各族自治县: {id: number}, 市辖区: {id: number}}}, 钦州市: {id: number, areasArr: string[], areas: {钦南区: {id: number}, 钦北区: {id: number}, 灵山县: {id: number}, 浦北县: {id: number}, 市辖区: {id: number}}}, 河池市: {id: number, areasArr: string[], areas: {金城江区: {id: number}, 南丹县: {id: number}, 天峨县: {id: number}, 凤山县: {id: number}, 东兰县: {id: number}, 罗城仫佬族自治县: {id: number}, 环江毛南族自治县: {id: number}, 巴马瑶族自治县: {id: number}, 都安瑶族自治县: {id: number}, 大化瑶族自治县: {id: number}, 宜州市: {id: number}, 市辖区: {id: number}}}, 北海市: {id: number, areasArr: string[], areas: {海城区: {id: number}, 银海区: {id: number}, 铁山港区: {id: number}, 合浦县: {id: number}, 市辖区: {id: number}}}}}, 甘肃省: {id: number, citiesArr: string[], cities: {兰州市: {id: number, areasArr: string[], areas: {城关区: {id: number}, 七里河区: {id: number}, 西固区: {id: number}, 安宁区: {id: number}, 红古区: {id: number}, 永登县: {id: number}, 皋兰县: {id: number}, 榆中县: {id: number}, 市辖区: {id: number}}}, 金昌市: {id: number, areasArr: string[], areas: {金川区: {id: number}, 永昌县: {id: number}, 市辖区: {id: number}}}, 白银市: {id: number, areasArr: string[], areas: {白银区: {id: number}, 平川区: {id: number}, 靖远县: {id: number}, 会宁县: {id: number}, 景泰县: {id: number}, 市辖区: {id: number}}}, 天水市: {id: number, areasArr: string[], areas: {秦州区: {id: number}, 麦积区: {id: number}, 清水县: {id: number}, 秦安县: {id: number}, 甘谷县: {id: number}, 武山县: {id: number}, 张家川回族自治县: {id: number}, 市辖区: {id: number}}}, 嘉峪关市: {id: number, areasArr: string[], areas: {市辖区: {id: number}}}, 武威市: {id: number, areasArr: string[], areas: {凉州区: {id: number}, 民勤县: {id: number}, 古浪县: {id: number}, 天祝藏族自治县: {id: number}, 市辖区: {id: number}}}, 张掖市: {id: number, areasArr: string[], areas: {甘州区: {id: number}, 肃南裕固族自治县: {id: number}, 民乐县: {id: number}, 临泽县: {id: number}, 高台县: {id: number}, 山丹县: {id: number}, 市辖区: {id: number}}}, 平凉市: {id: number, areasArr: string[], areas: {崆峒区: {id: number}, 泾川县: {id: number}, 灵台县: {id: number}, 崇信县: {id: number}, 华亭县: {id: number}, 庄浪县: {id: number}, 静宁县: {id: number}, 市辖区: {id: number}}}, 酒泉市: {id: number, areasArr: string[], areas: {肃州区: {id: number}, 金塔县: {id: number}, 瓜州县: {id: number}, 肃北蒙古族自治县: {id: number}, 阿克塞哈萨克族自治县: {id: number}, 玉门市: {id: number}, 敦煌市: {id: number}, 市辖区: {id: number}}}, 庆阳市: {id: number, areasArr: string[], areas: {西峰区: {id: number}, 庆城县: {id: number}, 环县: {id: number}, 华池县: {id: number}, 合水县: {id: number}, 正宁县: {id: number}, 宁县: {id: number}, 镇原县: {id: number}, 市辖区: {id: number}}}, 定西市: {id: number, areasArr: string[], areas: {安定区: {id: number}, 通渭县: {id: number}, 陇西县: {id: number}, 渭源县: {id: number}, 临洮县: {id: number}, 漳县: {id: number}, 岷县: {id: number}, 市辖区: {id: number}}}, 陇南市: {id: number, areasArr: string[], areas: {武都区: {id: number}, 成县: {id: number}, 文县: {id: number}, 宕昌县: {id: number}, 康县: {id: number}, 西和县: {id: number}, 礼县: {id: number}, 徽县: {id: number}, 两当县: {id: number}, 市辖区: {id: number}}}, 临夏回族自治州: {id: number, areasArr: string[], areas: {临夏市: {id: number}, 临夏县: {id: number}, 康乐县: {id: number}, 永靖县: {id: number}, 广河县: {id: number}, 和政县: {id: number}, 东乡族自治县: {id: number}, 积石山保安族东乡族撒拉族自治县: {id: number}}}, 甘南藏族自治州: {id: number, areasArr: string[], areas: {合作市: {id: number}, 临潭县: {id: number}, 卓尼县: {id: number}, 舟曲县: {id: number}, 迭部县: {id: number}, 玛曲县: {id: number}, 碌曲县: {id: number}, 夏河县: {id: number}}}}}, 陕西省: {id: number, citiesArr: string[], cities: {西安市: {id: number, areasArr: string[], areas: {新城区: {id: number}, 碑林区: {id: number}, 莲湖区: {id: number}, 灞桥区: {id: number}, 未央区: {id: number}, 雁塔区: {id: number}, 阎良区: {id: number}, 临潼区: {id: number}, 长安区: {id: number}, 蓝田县: {id: number}, 周至县: {id: number}, 户县: {id: number}, 高陵县: {id: number}, 市辖区: {id: number}}}, 咸阳市: {id: number, areasArr: string[], areas: {秦都区: {id: number}, 杨陵区: {id: number}, 渭城区: {id: number}, 三原县: {id: number}, 泾阳县: {id: number}, 乾县: {id: number}, 礼泉县: {id: number}, 永寿县: {id: number}, 彬县: {id: number}, 长武县: {id: number}, 旬邑县: {id: number}, 淳化县: {id: number}, 武功县: {id: number}, 兴平市: {id: number}, 市辖区: {id: number}}}, 延安市: {id: number, areasArr: string[], areas: {宝塔区: {id: number}, 延长县: {id: number}, 延川县: {id: number}, 子长县: {id: number}, 安塞县: {id: number}, 志丹县: {id: number}, 吴起县: {id: number}, 甘泉县: {id: number}, 富县: {id: number}, 洛川县: {id: number}, 宜川县: {id: number}, 黄龙县: {id: number}, 黄陵县: {id: number}, 市辖区: {id: number}}}, 榆林市: {id: number, areasArr: string[], areas: {榆阳区: {id: number}, 神木县: {id: number}, 府谷县: {id: number}, 横山县: {id: number}, 靖边县: {id: number}, 定边县: {id: number}, 绥德县: {id: number}, 米脂县: {id: number}, 佳县: {id: number}, 吴堡县: {id: number}, 清涧县: {id: number}, 子洲县: {id: number}, 市辖区: {id: number}}}, 渭南市: {id: number, areasArr: string[], areas: {临渭区: {id: number}, 华县: {id: number}, 潼关县: {id: number}, 大荔县: {id: number}, 合阳县: {id: number}, 澄城县: {id: number}, 蒲城县: {id: number}, 白水县: {id: number}, 富平县: {id: number}, 韩城市: {id: number}, 华阴市: {id: number}, 市辖区: {id: number}}}, 商洛市: {id: number, areasArr: string[], areas: {商州区: {id: number}, 洛南县: {id: number}, 丹凤县: {id: number}, 商南县: {id: number}, 山阳县: {id: number}, 镇安县: {id: number}, 柞水县: {id: number}, 市辖区: {id: number}}}, 安康市: {id: number, areasArr: string[], areas: {汉滨区: {id: number}, 汉阴县: {id: number}, 石泉县: {id: number}, 宁陕县: {id: number}, 紫阳县: {id: number}, 岚皋县: {id: number}, 平利县: {id: number}, 镇坪县: {id: number}, 旬阳县: {id: number}, 白河县: {id: number}, 市辖区: {id: number}}}, 汉中市: {id: number, areasArr: string[], areas: {汉台区: {id: number}, 南郑县: {id: number}, 城固县: {id: number}, 洋县: {id: number}, 西乡县: {id: number}, 勉县: {id: number}, 宁强县: {id: number}, 略阳县: {id: number}, 镇巴县: {id: number}, 留坝县: {id: number}, 佛坪县: {id: number}, 市辖区: {id: number}}}, 宝鸡市: {id: number, areasArr: string[], areas: {渭滨区: {id: number}, 金台区: {id: number}, 陈仓区: {id: number}, 凤翔县: {id: number}, 岐山县: {id: number}, 扶风县: {id: number}, 眉县: {id: number}, 陇县: {id: number}, 千阳县: {id: number}, 麟游县: {id: number}, 凤县: {id: number}, 太白县: {id: number}, 市辖区: {id: number}}}, 铜川市: {id: number, areasArr: string[], areas: {王益区: {id: number}, 印台区: {id: number}, 耀州区: {id: number}, 宜君县: {id: number}, 市辖区: {id: number}}}}}, 新疆维吾尔自治区: {id: number, citiesArr: string[], cities: {塔城地区: {id: number, areasArr: string[], areas: {塔城市: {id: number}, 乌苏市: {id: number}, 额敏县: {id: number}, 沙湾县: {id: number}, 托里县: {id: number}, 裕民县: {id: number}, 和布克赛尔蒙古自治县: {id: number}}}, 哈密地区: {id: number, areasArr: string[], areas: {哈密市: {id: number}, 巴里坤哈萨克自治县: {id: number}, 伊吾县: {id: number}}}, 和田地区: {id: number, areasArr: string[], areas: {和田市: {id: number}, 和田县: {id: number}, 墨玉县: {id: number}, 皮山县: {id: number}, 洛浦县: {id: number}, 策勒县: {id: number}, 于田县: {id: number}, 民丰县: {id: number}}}, 阿勒泰地区: {id: number, areasArr: string[], areas: {阿勒泰市: {id: number}, 布尔津县: {id: number}, 富蕴县: {id: number}, 福海县: {id: number}, 哈巴河县: {id: number}, 青河县: {id: number}, 吉木乃县: {id: number}}}, 克孜勒苏柯尔克孜自治州: {id: number, areasArr: string[], areas: {阿图什市: {id: number}, 阿克陶县: {id: number}, 阿合奇县: {id: number}, 乌恰县: {id: number}}}, 博尔塔拉蒙古自治州: {id: number, areasArr: string[], areas: {博乐市: {id: number}, 精河县: {id: number}, 温泉县: {id: number}}}, 克拉玛依市: {id: number, areasArr: string[], areas: {独山子区: {id: number}, 克拉玛依区: {id: number}, 白碱滩区: {id: number}, 乌尔禾区: {id: number}, 市辖区: {id: number}}}, 乌鲁木齐市: {id: number, areasArr: string[], areas: {天山区: {id: number}, 沙依巴克区: {id: number}, 新市区: {id: number}, 水磨沟区: {id: number}, 头屯河区: {id: number}, 达坂城区: {id: number}, 米东区: {id: number}, 乌鲁木齐县: {id: number}, 市辖区: {id: number}}}, 自治区直辖县级行政区划: {id: number, areasArr: string[], areas: {石河子市: {id: number}, 阿拉尔市: {id: number}, 图木舒克市: {id: number}, 五家渠市: {id: number}}}, 昌吉回族自治州: {id: number, areasArr: string[], areas: {昌吉市: {id: number}, 阜康市: {id: number}, 呼图壁县: {id: number}, 玛纳斯县: {id: number}, 奇台县: {id: number}, 吉木萨尔县: {id: number}, 木垒哈萨克自治县: {id: number}}}, 吐鲁番地区: {id: number, areasArr: string[], areas: {吐鲁番市: {id: number}, 鄯善县: {id: number}, 托克逊县: {id: number}}}, 巴音郭楞蒙古自治州: {id: number, areasArr: string[], areas: {库尔勒市: {id: number}, 轮台县: {id: number}, 尉犁县: {id: number}, 若羌县: {id: number}, 且末县: {id: number}, 焉耆回族自治县: {id: number}, 和静县: {id: number}, 和硕县: {id: number}, 博湖县: {id: number}}}, 阿克苏地区: {id: number, areasArr: string[], areas: {阿克苏市: {id: number}, 温宿县: {id: number}, 库车县: {id: number}, 沙雅县: {id: number}, 新和县: {id: number}, 拜城县: {id: number}, 乌什县: {id: number}, 阿瓦提县: {id: number}, 柯坪县: {id: number}}}, 喀什地区: {id: number, areasArr: string[], areas: {喀什市: {id: number}, 疏附县: {id: number}, 疏勒县: {id: number}, 英吉沙县: {id: number}, 泽普县: {id: number}, 莎车县: {id: number}, 叶城县: {id: number}, 麦盖提县: {id: number}, 岳普湖县: {id: number}, 伽师县: {id: number}, 巴楚县: {id: number}, 塔什库尔干塔吉克自治县: {id: number}}}, 伊犁哈萨克自治州: {id: number, areasArr: string[], areas: {伊宁市: {id: number}, 奎屯市: {id: number}, 伊宁县: {id: number}, 察布查尔锡伯自治县: {id: number}, 霍城县: {id: number}, 巩留县: {id: number}, 新源县: {id: number}, 昭苏县: {id: number}, 特克斯县: {id: number}, 尼勒克县: {id: number}}}}}, 青海省: {id: number, citiesArr: string[], cities: {海北藏族自治州: {id: number, areasArr: string[], areas: {门源回族自治县: {id: number}, 祁连县: {id: number}, 海晏县: {id: number}, 刚察县: {id: number}}}, 西宁市: {id: number, areasArr: string[], areas: {城东区: {id: number}, 城中区: {id: number}, 城西区: {id: number}, 城北区: {id: number}, 大通回族土族自治县: {id: number}, 湟中县: {id: number}, 湟源县: {id: number}, 市辖区: {id: number}}}, 海东地区: {id: number, areasArr: string[], areas: {平安县: {id: number}, 民和回族土族自治县: {id: number}, 乐都县: {id: number}, 互助土族自治县: {id: number}, 化隆回族自治县: {id: number}, 循化撒拉族自治县: {id: number}}}, 黄南藏族自治州: {id: number, areasArr: string[], areas: {同仁县: {id: number}, 尖扎县: {id: number}, 泽库县: {id: number}, 河南蒙古族自治县: {id: number}}}, 海南藏族自治州: {id: number, areasArr: string[], areas: {共和县: {id: number}, 同德县: {id: number}, 贵德县: {id: number}, 兴海县: {id: number}, 贵南县: {id: number}}}, 果洛藏族自治州: {id: number, areasArr: string[], areas: {玛沁县: {id: number}, 班玛县: {id: number}, 甘德县: {id: number}, 达日县: {id: number}, 久治县: {id: number}, 玛多县: {id: number}}}, 玉树藏族自治州: {id: number, areasArr: string[], areas: {玉树县: {id: number}, 杂多县: {id: number}, 称多县: {id: number}, 治多县: {id: number}, 囊谦县: {id: number}, 曲麻莱县: {id: number}}}, 海西蒙古族藏族自治州: {id: number, areasArr: string[], areas: {格尔木市: {id: number}, 德令哈市: {id: number}, 乌兰县: {id: number}, 都兰县: {id: number}, 天峻县: {id: number}}}}}, 宁夏回族自治区: {id: number, citiesArr: string[], cities: {银川市: {id: number, areasArr: string[], areas: {兴庆区: {id: number}, 西夏区: {id: number}, 金凤区: {id: number}, 永宁县: {id: number}, 贺兰县: {id: number}, 灵武市: {id: number}, 市辖区: {id: number}}}, 石嘴山市: {id: number, areasArr: string[], areas: {大武口区: {id: number}, 惠农区: {id: number}, 平罗县: {id: number}, 市辖区: {id: number}}}, 吴忠市: {id: number, areasArr: string[], areas: {利通区: {id: number}, 盐池县: {id: number}, 同心县: {id: number}, 青铜峡市: {id: number}, 市辖区: {id: number}}}, 固原市: {id: number, areasArr: string[], areas: {原州区: {id: number}, 西吉县: {id: number}, 隆德县: {id: number}, 泾源县: {id: number}, 彭阳县: {id: number}, 市辖区: {id: number}}}, 中卫市: {id: number, areasArr: string[], areas: {沙坡头区: {id: number}, 中宁县: {id: number}, 海原县: {id: number}, 市辖区: {id: number}}}}}, 重庆市: {id: number, citiesArr: string[], cities: {重庆市: {id: number, areasArr: string[], areas: {万州区: {id: number}, 涪陵区: {id: number}, 渝中区: {id: number}, 大渡口区: {id: number}, 江北区: {id: number}, 沙坪坝区: {id: number}, 九龙坡区: {id: number}, 南岸区: {id: number}, 北碚区: {id: number}, 万盛区: {id: number}, 双桥区: {id: number}, 渝北区: {id: number}, 巴南区: {id: number}, 黔江区: {id: number}, 长寿区: {id: number}, 江津区: {id: number}, 合川区: {id: number}, 永川区: {id: number}, 南川区: {id: number}, 綦江县: {id: number}, 潼南县: {id: number}, 铜梁县: {id: number}, 大足县: {id: number}, 荣昌县: {id: number}, 璧山县: {id: number}, 梁平县: {id: number}, 城口县: {id: number}, 丰都县: {id: number}, 垫江县: {id: number}, 武隆县: {id: number}, 忠县: {id: number}, 开县: {id: number}, 云阳县: {id: number}, 奉节县: {id: number}, 巫山县: {id: number}, 巫溪县: {id: number}, 石柱土家族自治县: {id: number}, 秀山土家族苗族自治县: {id: number}, 酉阳土家族苗族自治县: {id: number}, 彭水苗族土家族自治县: {id: number}}}}}, 四川省: {id: number, citiesArr: string[], cities: {成都市: {id: number, areasArr: string[], areas: {锦江区: {id: number}, 青羊区: {id: number}, 金牛区: {id: number}, 武侯区: {id: number}, 成华区: {id: number}, 龙泉驿区: {id: number}, 青白江区: {id: number}, 新都区: {id: number}, 温江区: {id: number}, 金堂县: {id: number}, 双流县: {id: number}, 郫县: {id: number}, 大邑县: {id: number}, 蒲江县: {id: number}, 新津县: {id: number}, 都江堰市: {id: number}, 彭州市: {id: number}, 邛崃市: {id: number}, 崇州市: {id: number}, 市辖区: {id: number}}}, 攀枝花市: {id: number, areasArr: string[], areas: {东区: {id: number}, 西区: {id: number}, 仁和区: {id: number}, 米易县: {id: number}, 盐边县: {id: number}, 市辖区: {id: number}}}, 自贡市: {id: number, areasArr: string[], areas: {自流井区: {id: number}, 贡井区: {id: number}, 大安区: {id: number}, 沿滩区: {id: number}, 荣县: {id: number}, 富顺县: {id: number}, 市辖区: {id: number}}}, 绵阳市: {id: number, areasArr: string[], areas: {涪城区: {id: number}, 游仙区: {id: number}, 三台县: {id: number}, 盐亭县: {id: number}, 安县: {id: number}, 梓潼县: {id: number}, 北川羌族自治县: {id: number}, 平武县: {id: number}, 江油市: {id: number}, 市辖区: {id: number}}}, 南充市: {id: number, areasArr: string[], areas: {顺庆区: {id: number}, 高坪区: {id: number}, 嘉陵区: {id: number}, 南部县: {id: number}, 营山县: {id: number}, 蓬安县: {id: number}, 仪陇县: {id: number}, 西充县: {id: number}, 阆中市: {id: number}, 市辖区: {id: number}}}, 达州市: {id: number, areasArr: string[], areas: {通川区: {id: number}, 达县: {id: number}, 宣汉县: {id: number}, 开江县: {id: number}, 大竹县: {id: number}, 渠县: {id: number}, 万源市: {id: number}, 市辖区: {id: number}}}, 遂宁市: {id: number, areasArr: string[], areas: {船山区: {id: number}, 安居区: {id: number}, 蓬溪县: {id: number}, 射洪县: {id: number}, 大英县: {id: number}, 市辖区: {id: number}}}, 广安市: {id: number, areasArr: string[], areas: {广安区: {id: number}, 岳池县: {id: number}, 武胜县: {id: number}, 邻水县: {id: number}, 华蓥市: {id: number}, 市辖区: {id: number}}}, 巴中市: {id: number, areasArr: string[], areas: {巴州区: {id: number}, 通江县: {id: number}, 南江县: {id: number}, 平昌县: {id: number}, 市辖区: {id: number}}}, 泸州市: {id: number, areasArr: string[], areas: {江阳区: {id: number}, 纳溪区: {id: number}, 龙马潭区: {id: number}, 泸县: {id: number}, 合江县: {id: number}, 叙永县: {id: number}, 古蔺县: {id: number}, 市辖区: {id: number}}}, 宜宾市: {id: number, areasArr: string[], areas: {翠屏区: {id: number}, 宜宾县: {id: number}, 南溪县: {id: number}, 江安县: {id: number}, 长宁县: {id: number}, 高县: {id: number}, 珙县: {id: number}, 筠连县: {id: number}, 兴文县: {id: number}, 屏山县: {id: number}, 市辖区: {id: number}}}, 资阳市: {id: number, areasArr: string[], areas: {雁江区: {id: number}, 安岳县: {id: number}, 乐至县: {id: number}, 简阳市: {id: number}, 市辖区: {id: number}}}, 内江市: {id: number, areasArr: string[], areas: {市中区: {id: number}, 东兴区: {id: number}, 威远县: {id: number}, 资中县: {id: number}, 隆昌县: {id: number}, 市辖区: {id: number}}}, 乐山市: {id: number, areasArr: string[], areas: {市中区: {id: number}, 沙湾区: {id: number}, 五通桥区: {id: number}, 金口河区: {id: number}, 犍为县: {id: number}, 井研县: {id: number}, 夹江县: {id: number}, 沐川县: {id: number}, 峨边彝族自治县: {id: number}, 马边彝族自治县: {id: number}, 峨眉山市: {id: number}, 市辖区: {id: number}}}, 眉山市: {id: number, areasArr: string[], areas: {东坡区: {id: number}, 仁寿县: {id: number}, 彭山县: {id: number}, 洪雅县: {id: number}, 丹棱县: {id: number}, 青神县: {id: number}, 市辖区: {id: number}}}, 凉山彝族自治州: {id: number, areasArr: string[], areas: {西昌市: {id: number}, 木里藏族自治县: {id: number}, 盐源县: {id: number}, 德昌县: {id: number}, 会理县: {id: number}, 会东县: {id: number}, 宁南县: {id: number}, 普格县: {id: number}, 布拖县: {id: number}, 金阳县: {id: number}, 昭觉县: {id: number}, 喜德县: {id: number}, 冕宁县: {id: number}, 越西县: {id: number}, 甘洛县: {id: number}, 美姑县: {id: number}, 雷波县: {id: number}}}, 雅安市: {id: number, areasArr: string[], areas: {雨城区: {id: number}, 名山县: {id: number}, 荥经县: {id: number}, 汉源县: {id: number}, 石棉县: {id: number}, 天全县: {id: number}, 芦山县: {id: number}, 宝兴县: {id: number}, 市辖区: {id: number}}}, 甘孜藏族自治州: {id: number, areasArr: string[], areas: {康定县: {id: number}, 泸定县: {id: number}, 丹巴县: {id: number}, 九龙县: {id: number}, 雅江县: {id: number}, 道孚县: {id: number}, 炉霍县: {id: number}, 甘孜县: {id: number}, 新龙县: {id: number}, 德格县: {id: number}, 白玉县: {id: number}, 石渠县: {id: number}, 色达县: {id: number}, 理塘县: {id: number}, 巴塘县: {id: number}, 乡城县: {id: number}, 稻城县: {id: number}, 得荣县: {id: number}}}, 阿坝藏族羌族自治州: {id: number, areasArr: string[], areas: {汶川县: {id: number}, 理县: {id: number}, 茂县: {id: number}, 松潘县: {id: number}, 九寨沟县: {id: number}, 金川县: {id: number}, 小金县: {id: number}, 黑水县: {id: number}, 马尔康县: {id: number}, 壤塘县: {id: number}, 阿坝县: {id: number}, 若尔盖县: {id: number}, 红原县: {id: number}}}, 德阳市: {id: number, areasArr: string[], areas: {旌阳区: {id: number}, 中江县: {id: number}, 罗江县: {id: number}, 广汉市: {id: number}, 什邡市: {id: number}, 绵竹市: {id: number}, 市辖区: {id: number}}}, 广元市: {id: number, areasArr: string[], areas: {市中区: {id: number}, 元坝区: {id: number}, 朝天区: {id: number}, 旺苍县: {id: number}, 青川县: {id: number}, 剑阁县: {id: number}, 苍溪县: {id: number}, 市辖区: {id: number}}}}}, 贵州省: {id: number, citiesArr: string[], cities: {贵阳市: {id: number, areasArr: string[], areas: {南明区: {id: number}, 云岩区: {id: number}, 花溪区: {id: number}, 乌当区: {id: number}, 白云区: {id: number}, 小河区: {id: number}, 开阳县: {id: number}, 息烽县: {id: number}, 修文县: {id: number}, 清镇市: {id: number}, 市辖区: {id: number}}}, 遵义市: {id: number, areasArr: string[], areas: {红花岗区: {id: number}, 汇川区: {id: number}, 遵义县: {id: number}, 桐梓县: {id: number}, 绥阳县: {id: number}, 正安县: {id: number}, 道真仡佬族苗族自治县: {id: number}, 务川仡佬族苗族自治县: {id: number}, 凤冈县: {id: number}, 湄潭县: {id: number}, 余庆县: {id: number}, 习水县: {id: number}, 赤水市: {id: number}, 仁怀市: {id: number}, 市辖区: {id: number}}}, 安顺市: {id: number, areasArr: string[], areas: {西秀区: {id: number}, 平坝县: {id: number}, 普定县: {id: number}, 镇宁布依族苗族自治县: {id: number}, 关岭布依族苗族自治县: {id: number}, 紫云苗族布依族自治县: {id: number}, 市辖区: {id: number}}}, 黔南布依族苗族自治州: {id: number, areasArr: string[], areas: {都匀市: {id: number}, 福泉市: {id: number}, 荔波县: {id: number}, 贵定县: {id: number}, 瓮安县: {id: number}, 独山县: {id: number}, 平塘县: {id: number}, 罗甸县: {id: number}, 长顺县: {id: number}, 龙里县: {id: number}, 惠水县: {id: number}, 三都水族自治县: {id: number}}}, 黔东南苗族侗族自治州: {id: number, areasArr: string[], areas: {凯里市: {id: number}, 黄平县: {id: number}, 施秉县: {id: number}, 三穗县: {id: number}, 镇远县: {id: number}, 岑巩县: {id: number}, 天柱县: {id: number}, 锦屏县: {id: number}, 剑河县: {id: number}, 台江县: {id: number}, 黎平县: {id: number}, 榕江县: {id: number}, 从江县: {id: number}, 雷山县: {id: number}, 麻江县: {id: number}, 丹寨县: {id: number}}}, 铜仁地区: {id: number, areasArr: string[], areas: {铜仁市: {id: number}, 江口县: {id: number}, 玉屏侗族自治县: {id: number}, 石阡县: {id: number}, 思南县: {id: number}, 印江土家族苗族自治县: {id: number}, 德江县: {id: number}, 沿河土家族自治县: {id: number}, 松桃苗族自治县: {id: number}, 万山特区: {id: number}}}, 毕节地区: {id: number, areasArr: string[], areas: {毕节市: {id: number}, 大方县: {id: number}, 黔西县: {id: number}, 金沙县: {id: number}, 织金县: {id: number}, 纳雍县: {id: number}, 威宁彝族回族苗族自治县: {id: number}, 赫章县: {id: number}}}, 六盘水市: {id: number, areasArr: string[], areas: {钟山区: {id: number}, 六枝特区: {id: number}, 水城县: {id: number}, 盘县: {id: number}}}, 黔西南布依族苗族自治州: {id: number, areasArr: string[], areas: {兴义市: {id: number}, 兴仁县: {id: number}, 普安县: {id: number}, 晴隆县: {id: number}, 贞丰县: {id: number}, 望谟县: {id: number}, 册亨县: {id: number}, 安龙县: {id: number}}}}}, 云南省: {id: number, citiesArr: string[], cities: {西双版纳傣族自治州: {id: number, areasArr: string[], areas: {景洪市: {id: number}, 勐海县: {id: number}, 勐腊县: {id: number}}}, 德宏傣族景颇族自治州: {id: number, areasArr: string[], areas: {瑞丽市: {id: number}, 潞西市: {id: number}, 梁河县: {id: number}, 盈江县: {id: number}, 陇川县: {id: number}}}, 昭通市: {id: number, areasArr: string[], areas: {昭阳区: {id: number}, 鲁甸县: {id: number}, 巧家县: {id: number}, 盐津县: {id: number}, 大关县: {id: number}, 永善县: {id: number}, 绥江县: {id: number}, 镇雄县: {id: number}, 彝良县: {id: number}, 威信县: {id: number}, 水富县: {id: number}, 市辖区: {id: number}}}, 昆明市: {id: number, areasArr: string[], areas: {五华区: {id: number}, 盘龙区: {id: number}, 官渡区: {id: number}, 西山区: {id: number}, 东川区: {id: number}, 呈贡县: {id: number}, 晋宁县: {id: number}, 富民县: {id: number}, 宜良县: {id: number}, 石林彝族自治县: {id: number}, 嵩明县: {id: number}, 禄劝彝族苗族自治县: {id: number}, 寻甸回族彝族自治县: {id: number}, 安宁市: {id: number}, 市辖区: {id: number}}}, 大理白族自治州: {id: number, areasArr: string[], areas: {大理市: {id: number}, 漾濞彝族自治县: {id: number}, 祥云县: {id: number}, 宾川县: {id: number}, 弥渡县: {id: number}, 南涧彝族自治县: {id: number}, 巍山彝族回族自治县: {id: number}, 永平县: {id: number}, 云龙县: {id: number}, 洱源县: {id: number}, 剑川县: {id: number}, 鹤庆县: {id: number}}}, 红河哈尼族彝族自治州: {id: number, areasArr: string[], areas: {个旧市: {id: number}, 开远市: {id: number}, 蒙自县: {id: number}, 屏边苗族自治县: {id: number}, 建水县: {id: number}, 石屏县: {id: number}, 弥勒县: {id: number}, 泸西县: {id: number}, 元阳县: {id: number}, 红河县: {id: number}, 金平苗族瑶族傣族自治县: {id: number}, 绿春县: {id: number}, 河口瑶族自治县: {id: number}}}, 曲靖市: {id: number, areasArr: string[], areas: {麒麟区: {id: number}, 马龙县: {id: number}, 陆良县: {id: number}, 师宗县: {id: number}, 罗平县: {id: number}, 富源县: {id: number}, 会泽县: {id: number}, 沾益县: {id: number}, 宣威市: {id: number}, 市辖区: {id: number}}}, 保山市: {id: number, areasArr: string[], areas: {隆阳区: {id: number}, 施甸县: {id: number}, 腾冲县: {id: number}, 龙陵县: {id: number}, 昌宁县: {id: number}, 市辖区: {id: number}}}, 文山壮族苗族自治州: {id: number, areasArr: string[], areas: {文山县: {id: number}, 砚山县: {id: number}, 西畴县: {id: number}, 麻栗坡县: {id: number}, 马关县: {id: number}, 丘北县: {id: number}, 广南县: {id: number}, 富宁县: {id: number}}}, 玉溪市: {id: number, areasArr: string[], areas: {红塔区: {id: number}, 江川县: {id: number}, 澄江县: {id: number}, 通海县: {id: number}, 华宁县: {id: number}, 易门县: {id: number}, 峨山彝族自治县: {id: number}, 新平彝族傣族自治县: {id: number}, 元江哈尼族彝族傣族自治县: {id: number}, 市辖区: {id: number}}}, 楚雄彝族自治州: {id: number, areasArr: string[], areas: {楚雄市: {id: number}, 双柏县: {id: number}, 牟定县: {id: number}, 南华县: {id: number}, 姚安县: {id: number}, 大姚县: {id: number}, 永仁县: {id: number}, 元谋县: {id: number}, 武定县: {id: number}, 禄丰县: {id: number}}}, 普洱市: {id: number, areasArr: string[], areas: {思茅区: {id: number}, 宁洱哈尼族彝族自治县: {id: number}, 墨江哈尼族自治县: {id: number}, 景东彝族自治县: {id: number}, 景谷傣族彝族自治县: {id: number}, 镇沅彝族哈尼族拉祜族自治县: {id: number}, 江城哈尼族彝族自治县: {id: number}, 孟连傣族拉祜族佤族自治县: {id: number}, 澜沧拉祜族自治县: {id: number}, 西盟佤族自治县: {id: number}, 市辖区: {id: number}}}, 临沧市: {id: number, areasArr: string[], areas: {临翔区: {id: number}, 凤庆县: {id: number}, 云县: {id: number}, 永德县: {id: number}, 镇康县: {id: number}, 双江拉祜族佤族布朗族傣族自治县: {id: number}, 耿马傣族佤族自治县: {id: number}, 沧源佤族自治县: {id: number}, 市辖区: {id: number}}}, 怒江傈僳族自治州: {id: number, areasArr: string[], areas: {泸水县: {id: number}, 福贡县: {id: number}, 贡山独龙族怒族自治县: {id: number}, 兰坪白族普米族自治县: {id: number}}}, 迪庆藏族自治州: {id: number, areasArr: string[], areas: {香格里拉县: {id: number}, 德钦县: {id: number}, 维西傈僳族自治县: {id: number}}}, 丽江市: {id: number, areasArr: string[], areas: {古城区: {id: number}, 玉龙纳西族自治县: {id: number}, 永胜县: {id: number}, 华坪县: {id: number}, 宁蒗彝族自治县: {id: number}, 市辖区: {id: number}}}}}, 西藏自治区: {id: number, citiesArr: string[], cities: {拉萨市: {id: number, areasArr: string[], areas: {城关区: {id: number}, 林周县: {id: number}, 当雄县: {id: number}, 尼木县: {id: number}, 曲水县: {id: number}, 堆龙德庆县: {id: number}, 达孜县: {id: number}, 墨竹工卡县: {id: number}, 市辖区: {id: number}}}, 日喀则地区: {id: number, areasArr: string[], areas: {日喀则市: {id: number}, 南木林县: {id: number}, 江孜县: {id: number}, 定日县: {id: number}, 萨迦县: {id: number}, 拉孜县: {id: number}, 昂仁县: {id: number}, 谢通门县: {id: number}, 白朗县: {id: number}, 仁布县: {id: number}, 康马县: {id: number}, 定结县: {id: number}, 仲巴县: {id: number}, 亚东县: {id: number}, 吉隆县: {id: number}, 聂拉木县: {id: number}, 萨嘎县: {id: number}, 岗巴县: {id: number}}}, 山南地区: {id: number, areasArr: string[], areas: {乃东县: {id: number}, 扎囊县: {id: number}, 贡嘎县: {id: number}, 桑日县: {id: number}, 琼结县: {id: number}, 曲松县: {id: number}, 措美县: {id: number}, 洛扎县: {id: number}, 加查县: {id: number}, 隆子县: {id: number}, 错那县: {id: number}, 浪卡子县: {id: number}}}, 林芝地区: {id: number, areasArr: string[], areas: {林芝县: {id: number}, 工布江达县: {id: number}, 米林县: {id: number}, 墨脱县: {id: number}, 波密县: {id: number}, 察隅县: {id: number}, 朗县: {id: number}}}, 昌都地区: {id: number, areasArr: string[], areas: {昌都县: {id: number}, 江达县: {id: number}, 贡觉县: {id: number}, 类乌齐县: {id: number}, 丁青县: {id: number}, 察雅县: {id: number}, 八宿县: {id: number}, 左贡县: {id: number}, 芒康县: {id: number}, 洛隆县: {id: number}, 边坝县: {id: number}}}, 那曲地区: {id: number, areasArr: string[], areas: {那曲县: {id: number}, 嘉黎县: {id: number}, 比如县: {id: number}, 聂荣县: {id: number}, 安多县: {id: number}, 申扎县: {id: number}, 索县: {id: number}, 班戈县: {id: number}, 巴青县: {id: number}, 尼玛县: {id: number}}}, 阿里地区: {id: number, areasArr: string[], areas: {普兰县: {id: number}, 札达县: {id: number}, 噶尔县: {id: number}, 日土县: {id: number}, 革吉县: {id: number}, 改则县: {id: number}, 措勤县: {id: number}}}}}}}}
 */


var regions ={
    "provincesArr": [
    "北京市",
    "天津市",
    "河北省",
    "山西省",
    "内蒙古自治区",
    "辽宁省",
    "吉林省",
    "黑龙江省",
    "上海市",
    "江苏省",
    "浙江省",
    "安徽省",
    "福建省",
    "江西省",
    "山东省",
    "河南省",
    "湖北省",
    "湖南省",
    "广东省",
    "海南省",
    "广西壮族自治区",
    "甘肃省",
    "陕西省",
    "新疆维吾尔自治区",
    "青海省",
    "宁夏回族自治区",
    "重庆市",
    "四川省",
    "贵州省",
    "云南省",
    "西藏自治区"
],
    "provinces": {
    "北京市": {
        "id": 11,
            "citiesArr": [
            "北京市"
        ],
            "cities": {
            "北京市": {
                "id": 101,
                    "areasArr": [
                    "东城区",
                    "西城区",
                    "崇文区",
                    "宣武区",
                    "朝阳区",
                    "丰台区",
                    "石景山区",
                    "海淀区",
                    "门头沟区",
                    "房山区",
                    "通州区",
                    "顺义区",
                    "昌平区",
                    "大兴区",
                    "怀柔区",
                    "平谷区",
                    "密云县",
                    "延庆县"
                ],
                    "areas": {
                    "东城区": {
                        "id": 1001
                    },
                    "西城区": {
                        "id": 1002
                    },
                    "崇文区": {
                        "id": 1003
                    },
                    "宣武区": {
                        "id": 1004
                    },
                    "朝阳区": {
                        "id": 1005
                    },
                    "丰台区": {
                        "id": 1006
                    },
                    "石景山区": {
                        "id": 1007
                    },
                    "海淀区": {
                        "id": 1008
                    },
                    "门头沟区": {
                        "id": 1009
                    },
                    "房山区": {
                        "id": 1010
                    },
                    "通州区": {
                        "id": 1011
                    },
                    "顺义区": {
                        "id": 1012
                    },
                    "昌平区": {
                        "id": 1013
                    },
                    "大兴区": {
                        "id": 1014
                    },
                    "怀柔区": {
                        "id": 1015
                    },
                    "平谷区": {
                        "id": 1016
                    },
                    "密云县": {
                        "id": 1017
                    },
                    "延庆县": {
                        "id": 1018
                    }
                }
            }
        }
    },
    "天津市": {
        "id": 12,
            "citiesArr": [
            "天津市"
        ],
            "cities": {
            "天津市": {
                "id": 102,
                    "areasArr": [
                    "和平区",
                    "河东区",
                    "河西区",
                    "南开区",
                    "河北区",
                    "红桥区",
                    "塘沽区",
                    "汉沽区",
                    "大港区",
                    "东丽区",
                    "西青区",
                    "津南区",
                    "北辰区",
                    "武清区",
                    "宝坻区",
                    "宁河县",
                    "静海县",
                    "蓟县"
                ],
                    "areas": {
                    "和平区": {
                        "id": 1019
                    },
                    "河东区": {
                        "id": 1020
                    },
                    "河西区": {
                        "id": 1021
                    },
                    "南开区": {
                        "id": 1022
                    },
                    "河北区": {
                        "id": 1023
                    },
                    "红桥区": {
                        "id": 1024
                    },
                    "塘沽区": {
                        "id": 1025
                    },
                    "汉沽区": {
                        "id": 1026
                    },
                    "大港区": {
                        "id": 1027
                    },
                    "东丽区": {
                        "id": 1028
                    },
                    "西青区": {
                        "id": 1029
                    },
                    "津南区": {
                        "id": 1030
                    },
                    "北辰区": {
                        "id": 1031
                    },
                    "武清区": {
                        "id": 1032
                    },
                    "宝坻区": {
                        "id": 1033
                    },
                    "宁河县": {
                        "id": 1034
                    },
                    "静海县": {
                        "id": 1035
                    },
                    "蓟县": {
                        "id": 1036
                    }
                }
            }
        }
    },
    "河北省": {
        "id": 13,
            "citiesArr": [
            "邯郸市",
            "石家庄市",
            "保定市",
            "张家口市",
            "承德市",
            "唐山市",
            "廊坊市",
            "沧州市",
            "衡水市",
            "邢台市",
            "秦皇岛市"
        ],
            "cities": {
            "邯郸市": {
                "id": 105,
                    "areasArr": [
                    "邯山区",
                    "丛台区",
                    "复兴区",
                    "峰峰矿区",
                    "邯郸县",
                    "临漳县",
                    "成安县",
                    "大名县",
                    "涉县",
                    "磁县",
                    "肥乡县",
                    "永年县",
                    "邱县",
                    "鸡泽县",
                    "广平县",
                    "馆陶县",
                    "魏县",
                    "曲周县",
                    "武安市",
                    "市辖区"
                ],
                    "areas": {
                    "邯山区": {
                        "id": 1096
                    },
                    "丛台区": {
                        "id": 1097
                    },
                    "复兴区": {
                        "id": 1098
                    },
                    "峰峰矿区": {
                        "id": 1099
                    },
                    "邯郸县": {
                        "id": 1100
                    },
                    "临漳县": {
                        "id": 1101
                    },
                    "成安县": {
                        "id": 1102
                    },
                    "大名县": {
                        "id": 1103
                    },
                    "涉县": {
                        "id": 1104
                    },
                    "磁县": {
                        "id": 1105
                    },
                    "肥乡县": {
                        "id": 1106
                    },
                    "永年县": {
                        "id": 1107
                    },
                    "邱县": {
                        "id": 1108
                    },
                    "鸡泽县": {
                        "id": 1109
                    },
                    "广平县": {
                        "id": 1110
                    },
                    "馆陶县": {
                        "id": 1111
                    },
                    "魏县": {
                        "id": 1112
                    },
                    "曲周县": {
                        "id": 1113
                    },
                    "武安市": {
                        "id": 1114
                    },
                    "市辖区": {
                        "id": 3856
                    }
                }
            },
            "石家庄市": {
                "id": 106,
                    "areasArr": [
                    "长安区",
                    "桥东区",
                    "桥西区",
                    "新华区",
                    "井陉矿区",
                    "裕华区",
                    "井陉县",
                    "正定县",
                    "栾城县",
                    "行唐县",
                    "灵寿县",
                    "高邑县",
                    "深泽县",
                    "赞皇县",
                    "无极县",
                    "平山县",
                    "元氏县",
                    "赵县",
                    "辛集市",
                    "藁城市",
                    "晋州市",
                    "新乐市",
                    "鹿泉市",
                    "市辖区"
                ],
                    "areas": {
                    "长安区": {
                        "id": 1115
                    },
                    "桥东区": {
                        "id": 1116
                    },
                    "桥西区": {
                        "id": 1117
                    },
                    "新华区": {
                        "id": 1118
                    },
                    "井陉矿区": {
                        "id": 1119
                    },
                    "裕华区": {
                        "id": 1120
                    },
                    "井陉县": {
                        "id": 1121
                    },
                    "正定县": {
                        "id": 1122
                    },
                    "栾城县": {
                        "id": 1123
                    },
                    "行唐县": {
                        "id": 1124
                    },
                    "灵寿县": {
                        "id": 1125
                    },
                    "高邑县": {
                        "id": 1126
                    },
                    "深泽县": {
                        "id": 1127
                    },
                    "赞皇县": {
                        "id": 1128
                    },
                    "无极县": {
                        "id": 1129
                    },
                    "平山县": {
                        "id": 1130
                    },
                    "元氏县": {
                        "id": 1131
                    },
                    "赵县": {
                        "id": 1132
                    },
                    "辛集市": {
                        "id": 1133
                    },
                    "藁城市": {
                        "id": 1134
                    },
                    "晋州市": {
                        "id": 1135
                    },
                    "新乐市": {
                        "id": 1136
                    },
                    "鹿泉市": {
                        "id": 1137
                    },
                    "市辖区": {
                        "id": 3853
                    }
                }
            },
            "保定市": {
                "id": 107,
                    "areasArr": [
                    "新市区",
                    "北市区",
                    "南市区",
                    "满城县",
                    "清苑县",
                    "涞水县",
                    "阜平县",
                    "徐水县",
                    "定兴县",
                    "唐县",
                    "高阳县",
                    "容城县",
                    "涞源县",
                    "望都县",
                    "安新县",
                    "易县",
                    "曲阳县",
                    "蠡县",
                    "顺平县",
                    "博野县",
                    "雄县",
                    "涿州市",
                    "定州市",
                    "安国市",
                    "高碑店市",
                    "市辖区"
                ],
                    "areas": {
                    "新市区": {
                        "id": 1138
                    },
                    "北市区": {
                        "id": 1139
                    },
                    "南市区": {
                        "id": 1140
                    },
                    "满城县": {
                        "id": 1141
                    },
                    "清苑县": {
                        "id": 1142
                    },
                    "涞水县": {
                        "id": 1143
                    },
                    "阜平县": {
                        "id": 1144
                    },
                    "徐水县": {
                        "id": 1145
                    },
                    "定兴县": {
                        "id": 1146
                    },
                    "唐县": {
                        "id": 1147
                    },
                    "高阳县": {
                        "id": 1148
                    },
                    "容城县": {
                        "id": 1149
                    },
                    "涞源县": {
                        "id": 1150
                    },
                    "望都县": {
                        "id": 1151
                    },
                    "安新县": {
                        "id": 1152
                    },
                    "易县": {
                        "id": 1153
                    },
                    "曲阳县": {
                        "id": 1154
                    },
                    "蠡县": {
                        "id": 1155
                    },
                    "顺平县": {
                        "id": 1156
                    },
                    "博野县": {
                        "id": 1157
                    },
                    "雄县": {
                        "id": 1158
                    },
                    "涿州市": {
                        "id": 1159
                    },
                    "定州市": {
                        "id": 1160
                    },
                    "安国市": {
                        "id": 1161
                    },
                    "高碑店市": {
                        "id": 1162
                    },
                    "市辖区": {
                        "id": 3858
                    }
                }
            },
            "张家口市": {
                "id": 108,
                    "areasArr": [
                    "桥东区",
                    "桥西区",
                    "宣化区",
                    "下花园区",
                    "宣化县",
                    "张北县",
                    "康保县",
                    "沽源县",
                    "尚义县",
                    "蔚县",
                    "阳原县",
                    "怀安县",
                    "万全县",
                    "怀来县",
                    "涿鹿县",
                    "赤城县",
                    "崇礼县",
                    "市辖区"
                ],
                    "areas": {
                    "桥东区": {
                        "id": 1163
                    },
                    "桥西区": {
                        "id": 1164
                    },
                    "宣化区": {
                        "id": 1165
                    },
                    "下花园区": {
                        "id": 1166
                    },
                    "宣化县": {
                        "id": 1167
                    },
                    "张北县": {
                        "id": 1168
                    },
                    "康保县": {
                        "id": 1169
                    },
                    "沽源县": {
                        "id": 1170
                    },
                    "尚义县": {
                        "id": 1171
                    },
                    "蔚县": {
                        "id": 1172
                    },
                    "阳原县": {
                        "id": 1173
                    },
                    "怀安县": {
                        "id": 1174
                    },
                    "万全县": {
                        "id": 1175
                    },
                    "怀来县": {
                        "id": 1176
                    },
                    "涿鹿县": {
                        "id": 1177
                    },
                    "赤城县": {
                        "id": 1178
                    },
                    "崇礼县": {
                        "id": 1179
                    },
                    "市辖区": {
                        "id": 3859
                    }
                }
            },
            "承德市": {
                "id": 109,
                    "areasArr": [
                    "双桥区",
                    "双滦区",
                    "鹰手营子矿区",
                    "承德县",
                    "兴隆县",
                    "平泉县",
                    "滦平县",
                    "隆化县",
                    "丰宁满族自治县",
                    "宽城满族自治县",
                    "围场满族蒙古族自治县",
                    "市辖区"
                ],
                    "areas": {
                    "双桥区": {
                        "id": 1180
                    },
                    "双滦区": {
                        "id": 1181
                    },
                    "鹰手营子矿区": {
                        "id": 1182
                    },
                    "承德县": {
                        "id": 1183
                    },
                    "兴隆县": {
                        "id": 1184
                    },
                    "平泉县": {
                        "id": 1185
                    },
                    "滦平县": {
                        "id": 1186
                    },
                    "隆化县": {
                        "id": 1187
                    },
                    "丰宁满族自治县": {
                        "id": 1188
                    },
                    "宽城满族自治县": {
                        "id": 1189
                    },
                    "围场满族蒙古族自治县": {
                        "id": 1190
                    },
                    "市辖区": {
                        "id": 3860
                    }
                }
            },
            "唐山市": {
                "id": 110,
                    "areasArr": [
                    "路南区",
                    "路北区",
                    "古冶区",
                    "开平区",
                    "丰南区",
                    "丰润区",
                    "滦县",
                    "滦南县",
                    "乐亭县",
                    "迁西县",
                    "玉田县",
                    "唐海县",
                    "遵化市",
                    "迁安市",
                    "市辖区"
                ],
                    "areas": {
                    "路南区": {
                        "id": 1191
                    },
                    "路北区": {
                        "id": 1192
                    },
                    "古冶区": {
                        "id": 1193
                    },
                    "开平区": {
                        "id": 1194
                    },
                    "丰南区": {
                        "id": 1195
                    },
                    "丰润区": {
                        "id": 1196
                    },
                    "滦县": {
                        "id": 1197
                    },
                    "滦南县": {
                        "id": 1198
                    },
                    "乐亭县": {
                        "id": 1199
                    },
                    "迁西县": {
                        "id": 1200
                    },
                    "玉田县": {
                        "id": 1201
                    },
                    "唐海县": {
                        "id": 1202
                    },
                    "遵化市": {
                        "id": 1203
                    },
                    "迁安市": {
                        "id": 1204
                    },
                    "市辖区": {
                        "id": 3854
                    }
                }
            },
            "廊坊市": {
                "id": 111,
                    "areasArr": [
                    "安次区",
                    "广阳区",
                    "固安县",
                    "永清县",
                    "香河县",
                    "大城县",
                    "文安县",
                    "大厂回族自治县",
                    "霸州市",
                    "三河市",
                    "市辖区"
                ],
                    "areas": {
                    "安次区": {
                        "id": 1205
                    },
                    "广阳区": {
                        "id": 1206
                    },
                    "固安县": {
                        "id": 1207
                    },
                    "永清县": {
                        "id": 1208
                    },
                    "香河县": {
                        "id": 1209
                    },
                    "大城县": {
                        "id": 1210
                    },
                    "文安县": {
                        "id": 1211
                    },
                    "大厂回族自治县": {
                        "id": 1212
                    },
                    "霸州市": {
                        "id": 1213
                    },
                    "三河市": {
                        "id": 1214
                    },
                    "市辖区": {
                        "id": 3862
                    }
                }
            },
            "沧州市": {
                "id": 112,
                    "areasArr": [
                    "新华区",
                    "运河区",
                    "沧县",
                    "青县",
                    "东光县",
                    "海兴县",
                    "盐山县",
                    "肃宁县",
                    "南皮县",
                    "吴桥县",
                    "献县",
                    "孟村回族自治县",
                    "泊头市",
                    "任丘市",
                    "黄骅市",
                    "河间市",
                    "市辖区"
                ],
                    "areas": {
                    "新华区": {
                        "id": 1215
                    },
                    "运河区": {
                        "id": 1216
                    },
                    "沧县": {
                        "id": 1217
                    },
                    "青县": {
                        "id": 1218
                    },
                    "东光县": {
                        "id": 1219
                    },
                    "海兴县": {
                        "id": 1220
                    },
                    "盐山县": {
                        "id": 1221
                    },
                    "肃宁县": {
                        "id": 1222
                    },
                    "南皮县": {
                        "id": 1223
                    },
                    "吴桥县": {
                        "id": 1224
                    },
                    "献县": {
                        "id": 1225
                    },
                    "孟村回族自治县": {
                        "id": 1226
                    },
                    "泊头市": {
                        "id": 1227
                    },
                    "任丘市": {
                        "id": 1228
                    },
                    "黄骅市": {
                        "id": 1229
                    },
                    "河间市": {
                        "id": 1230
                    },
                    "市辖区": {
                        "id": 3861
                    }
                }
            },
            "衡水市": {
                "id": 113,
                    "areasArr": [
                    "桃城区",
                    "枣强县",
                    "武邑县",
                    "武强县",
                    "饶阳县",
                    "安平县",
                    "故城县",
                    "景县",
                    "阜城县",
                    "冀州市",
                    "深州市",
                    "市辖区"
                ],
                    "areas": {
                    "桃城区": {
                        "id": 1231
                    },
                    "枣强县": {
                        "id": 1232
                    },
                    "武邑县": {
                        "id": 1233
                    },
                    "武强县": {
                        "id": 1234
                    },
                    "饶阳县": {
                        "id": 1235
                    },
                    "安平县": {
                        "id": 1236
                    },
                    "故城县": {
                        "id": 1237
                    },
                    "景县": {
                        "id": 1238
                    },
                    "阜城县": {
                        "id": 1239
                    },
                    "冀州市": {
                        "id": 1240
                    },
                    "深州市": {
                        "id": 1241
                    },
                    "市辖区": {
                        "id": 3863
                    }
                }
            },
            "邢台市": {
                "id": 114,
                    "areasArr": [
                    "桥东区",
                    "桥西区",
                    "邢台县",
                    "临城县",
                    "内丘县",
                    "柏乡县",
                    "隆尧县",
                    "任县",
                    "南和县",
                    "宁晋县",
                    "巨鹿县",
                    "新河县",
                    "广宗县",
                    "平乡县",
                    "威县",
                    "清河县",
                    "临西县",
                    "南宫市",
                    "沙河市",
                    "市辖区"
                ],
                    "areas": {
                    "桥东区": {
                        "id": 1242
                    },
                    "桥西区": {
                        "id": 1243
                    },
                    "邢台县": {
                        "id": 1244
                    },
                    "临城县": {
                        "id": 1245
                    },
                    "内丘县": {
                        "id": 1246
                    },
                    "柏乡县": {
                        "id": 1247
                    },
                    "隆尧县": {
                        "id": 1248
                    },
                    "任县": {
                        "id": 1249
                    },
                    "南和县": {
                        "id": 1250
                    },
                    "宁晋县": {
                        "id": 1251
                    },
                    "巨鹿县": {
                        "id": 1252
                    },
                    "新河县": {
                        "id": 1253
                    },
                    "广宗县": {
                        "id": 1254
                    },
                    "平乡县": {
                        "id": 1255
                    },
                    "威县": {
                        "id": 1256
                    },
                    "清河县": {
                        "id": 1257
                    },
                    "临西县": {
                        "id": 1258
                    },
                    "南宫市": {
                        "id": 1259
                    },
                    "沙河市": {
                        "id": 1260
                    },
                    "市辖区": {
                        "id": 3857
                    }
                }
            },
            "秦皇岛市": {
                "id": 115,
                    "areasArr": [
                    "海港区",
                    "山海关区",
                    "北戴河区",
                    "青龙满族自治县",
                    "昌黎县",
                    "抚宁县",
                    "卢龙县",
                    "市辖区"
                ],
                    "areas": {
                    "海港区": {
                        "id": 1261
                    },
                    "山海关区": {
                        "id": 1262
                    },
                    "北戴河区": {
                        "id": 1263
                    },
                    "青龙满族自治县": {
                        "id": 1264
                    },
                    "昌黎县": {
                        "id": 1265
                    },
                    "抚宁县": {
                        "id": 1266
                    },
                    "卢龙县": {
                        "id": 1267
                    },
                    "市辖区": {
                        "id": 3855
                    }
                }
            }
        }
    },
    "山西省": {
        "id": 14,
            "citiesArr": [
            "朔州市",
            "忻州市",
            "太原市",
            "大同市",
            "阳泉市",
            "晋中市",
            "长治市",
            "晋城市",
            "临汾市",
            "吕梁市",
            "运城市"
        ],
            "cities": {
            "朔州市": {
                "id": 116,
                    "areasArr": [
                    "朔城区",
                    "平鲁区",
                    "山阴县",
                    "应县",
                    "右玉县",
                    "怀仁县",
                    "市辖区"
                ],
                    "areas": {
                    "朔城区": {
                        "id": 1268
                    },
                    "平鲁区": {
                        "id": 1269
                    },
                    "山阴县": {
                        "id": 1270
                    },
                    "应县": {
                        "id": 1271
                    },
                    "右玉县": {
                        "id": 1272
                    },
                    "怀仁县": {
                        "id": 1273
                    },
                    "市辖区": {
                        "id": 3869
                    }
                }
            },
            "忻州市": {
                "id": 117,
                    "areasArr": [
                    "忻府区",
                    "定襄县",
                    "五台县",
                    "代县",
                    "繁峙县",
                    "宁武县",
                    "静乐县",
                    "神池县",
                    "五寨县",
                    "岢岚县",
                    "河曲县",
                    "保德县",
                    "偏关县",
                    "原平市",
                    "市辖区"
                ],
                    "areas": {
                    "忻府区": {
                        "id": 1274
                    },
                    "定襄县": {
                        "id": 1275
                    },
                    "五台县": {
                        "id": 1276
                    },
                    "代县": {
                        "id": 1277
                    },
                    "繁峙县": {
                        "id": 1278
                    },
                    "宁武县": {
                        "id": 1279
                    },
                    "静乐县": {
                        "id": 1280
                    },
                    "神池县": {
                        "id": 1281
                    },
                    "五寨县": {
                        "id": 1282
                    },
                    "岢岚县": {
                        "id": 1283
                    },
                    "河曲县": {
                        "id": 1284
                    },
                    "保德县": {
                        "id": 1285
                    },
                    "偏关县": {
                        "id": 1286
                    },
                    "原平市": {
                        "id": 1287
                    },
                    "市辖区": {
                        "id": 3872
                    }
                }
            },
            "太原市": {
                "id": 118,
                    "areasArr": [
                    "小店区",
                    "迎泽区",
                    "杏花岭区",
                    "尖草坪区",
                    "万柏林区",
                    "晋源区",
                    "清徐县",
                    "阳曲县",
                    "娄烦县",
                    "古交市",
                    "市辖区"
                ],
                    "areas": {
                    "小店区": {
                        "id": 1288
                    },
                    "迎泽区": {
                        "id": 1289
                    },
                    "杏花岭区": {
                        "id": 1290
                    },
                    "尖草坪区": {
                        "id": 1291
                    },
                    "万柏林区": {
                        "id": 1292
                    },
                    "晋源区": {
                        "id": 1293
                    },
                    "清徐县": {
                        "id": 1294
                    },
                    "阳曲县": {
                        "id": 1295
                    },
                    "娄烦县": {
                        "id": 1296
                    },
                    "古交市": {
                        "id": 1297
                    },
                    "市辖区": {
                        "id": 3864
                    }
                }
            },
            "大同市": {
                "id": 119,
                    "areasArr": [
                    "矿区",
                    "南郊区",
                    "新荣区",
                    "阳高县",
                    "天镇县",
                    "广灵县",
                    "灵丘县",
                    "浑源县",
                    "左云县",
                    "大同县",
                    "市辖区",
                    "城区"
                ],
                    "areas": {
                    "矿区": {
                        "id": 1298
                    },
                    "南郊区": {
                        "id": 1299
                    },
                    "新荣区": {
                        "id": 1300
                    },
                    "阳高县": {
                        "id": 1301
                    },
                    "天镇县": {
                        "id": 1302
                    },
                    "广灵县": {
                        "id": 1303
                    },
                    "灵丘县": {
                        "id": 1304
                    },
                    "浑源县": {
                        "id": 1305
                    },
                    "左云县": {
                        "id": 1306
                    },
                    "大同县": {
                        "id": 1307
                    },
                    "市辖区": {
                        "id": 3865
                    },
                    "城区": {
                        "id": 4133
                    }
                }
            },
            "阳泉市": {
                "id": 120,
                    "areasArr": [
                    "矿区",
                    "平定县",
                    "盂县",
                    "市辖区",
                    "城区",
                    "郊区"
                ],
                    "areas": {
                    "矿区": {
                        "id": 1308
                    },
                    "平定县": {
                        "id": 1309
                    },
                    "盂县": {
                        "id": 1310
                    },
                    "市辖区": {
                        "id": 3866
                    },
                    "城区": {
                        "id": 4134
                    },
                    "郊区": {
                        "id": 4135
                    }
                }
            },
            "晋中市": {
                "id": 121,
                    "areasArr": [
                    "榆次区",
                    "榆社县",
                    "左权县",
                    "和顺县",
                    "昔阳县",
                    "寿阳县",
                    "太谷县",
                    "祁县",
                    "平遥县",
                    "灵石县",
                    "介休市",
                    "市辖区"
                ],
                    "areas": {
                    "榆次区": {
                        "id": 1311
                    },
                    "榆社县": {
                        "id": 1312
                    },
                    "左权县": {
                        "id": 1313
                    },
                    "和顺县": {
                        "id": 1314
                    },
                    "昔阳县": {
                        "id": 1315
                    },
                    "寿阳县": {
                        "id": 1316
                    },
                    "太谷县": {
                        "id": 1317
                    },
                    "祁县": {
                        "id": 1318
                    },
                    "平遥县": {
                        "id": 1319
                    },
                    "灵石县": {
                        "id": 1320
                    },
                    "介休市": {
                        "id": 1321
                    },
                    "市辖区": {
                        "id": 3870
                    }
                }
            },
            "长治市": {
                "id": 122,
                    "areasArr": [
                    "长治县",
                    "襄垣县",
                    "屯留县",
                    "平顺县",
                    "黎城县",
                    "壶关县",
                    "长子县",
                    "武乡县",
                    "沁县",
                    "沁源县",
                    "潞城市",
                    "市辖区",
                    "城区",
                    "郊区"
                ],
                    "areas": {
                    "长治县": {
                        "id": 1322
                    },
                    "襄垣县": {
                        "id": 1323
                    },
                    "屯留县": {
                        "id": 1324
                    },
                    "平顺县": {
                        "id": 1325
                    },
                    "黎城县": {
                        "id": 1326
                    },
                    "壶关县": {
                        "id": 1327
                    },
                    "长子县": {
                        "id": 1328
                    },
                    "武乡县": {
                        "id": 1329
                    },
                    "沁县": {
                        "id": 1330
                    },
                    "沁源县": {
                        "id": 1331
                    },
                    "潞城市": {
                        "id": 1332
                    },
                    "市辖区": {
                        "id": 3867
                    },
                    "城区": {
                        "id": 4136
                    },
                    "郊区": {
                        "id": 4137
                    }
                }
            },
            "晋城市": {
                "id": 123,
                    "areasArr": [
                    "沁水县",
                    "阳城县",
                    "陵川县",
                    "泽州县",
                    "高平市",
                    "市辖区",
                    "城区"
                ],
                    "areas": {
                    "沁水县": {
                        "id": 1333
                    },
                    "阳城县": {
                        "id": 1334
                    },
                    "陵川县": {
                        "id": 1335
                    },
                    "泽州县": {
                        "id": 1336
                    },
                    "高平市": {
                        "id": 1337
                    },
                    "市辖区": {
                        "id": 3868
                    },
                    "城区": {
                        "id": 4138
                    }
                }
            },
            "临汾市": {
                "id": 124,
                    "areasArr": [
                    "尧都区",
                    "曲沃县",
                    "翼城县",
                    "襄汾县",
                    "洪洞县",
                    "古县",
                    "安泽县",
                    "浮山县",
                    "吉县",
                    "乡宁县",
                    "大宁县",
                    "隰县",
                    "永和县",
                    "蒲县",
                    "汾西县",
                    "侯马市",
                    "霍州市",
                    "市辖区"
                ],
                    "areas": {
                    "尧都区": {
                        "id": 1338
                    },
                    "曲沃县": {
                        "id": 1339
                    },
                    "翼城县": {
                        "id": 1340
                    },
                    "襄汾县": {
                        "id": 1341
                    },
                    "洪洞县": {
                        "id": 1342
                    },
                    "古县": {
                        "id": 1343
                    },
                    "安泽县": {
                        "id": 1344
                    },
                    "浮山县": {
                        "id": 1345
                    },
                    "吉县": {
                        "id": 1346
                    },
                    "乡宁县": {
                        "id": 1347
                    },
                    "大宁县": {
                        "id": 1348
                    },
                    "隰县": {
                        "id": 1349
                    },
                    "永和县": {
                        "id": 1350
                    },
                    "蒲县": {
                        "id": 1351
                    },
                    "汾西县": {
                        "id": 1352
                    },
                    "侯马市": {
                        "id": 1353
                    },
                    "霍州市": {
                        "id": 1354
                    },
                    "市辖区": {
                        "id": 3873
                    }
                }
            },
            "吕梁市": {
                "id": 125,
                    "areasArr": [
                    "离石区",
                    "文水县",
                    "交城县",
                    "兴县",
                    "临县",
                    "柳林县",
                    "石楼县",
                    "岚县",
                    "方山县",
                    "中阳县",
                    "交口县",
                    "孝义市",
                    "汾阳市",
                    "市辖区"
                ],
                    "areas": {
                    "离石区": {
                        "id": 1355
                    },
                    "文水县": {
                        "id": 1356
                    },
                    "交城县": {
                        "id": 1357
                    },
                    "兴县": {
                        "id": 1358
                    },
                    "临县": {
                        "id": 1359
                    },
                    "柳林县": {
                        "id": 1360
                    },
                    "石楼县": {
                        "id": 1361
                    },
                    "岚县": {
                        "id": 1362
                    },
                    "方山县": {
                        "id": 1363
                    },
                    "中阳县": {
                        "id": 1364
                    },
                    "交口县": {
                        "id": 1365
                    },
                    "孝义市": {
                        "id": 1366
                    },
                    "汾阳市": {
                        "id": 1367
                    },
                    "市辖区": {
                        "id": 3874
                    }
                }
            },
            "运城市": {
                "id": 126,
                    "areasArr": [
                    "盐湖区",
                    "临猗县",
                    "万荣县",
                    "闻喜县",
                    "稷山县",
                    "新绛县",
                    "绛县",
                    "垣曲县",
                    "夏县",
                    "平陆县",
                    "芮城县",
                    "永济市",
                    "河津市",
                    "市辖区"
                ],
                    "areas": {
                    "盐湖区": {
                        "id": 1368
                    },
                    "临猗县": {
                        "id": 1369
                    },
                    "万荣县": {
                        "id": 1370
                    },
                    "闻喜县": {
                        "id": 1371
                    },
                    "稷山县": {
                        "id": 1372
                    },
                    "新绛县": {
                        "id": 1373
                    },
                    "绛县": {
                        "id": 1374
                    },
                    "垣曲县": {
                        "id": 1375
                    },
                    "夏县": {
                        "id": 1376
                    },
                    "平陆县": {
                        "id": 1377
                    },
                    "芮城县": {
                        "id": 1378
                    },
                    "永济市": {
                        "id": 1379
                    },
                    "河津市": {
                        "id": 1380
                    },
                    "市辖区": {
                        "id": 3871
                    }
                }
            }
        }
    },
    "内蒙古自治区": {
        "id": 15,
            "citiesArr": [
            "呼伦贝尔市",
            "呼和浩特市",
            "包头市",
            "乌海市",
            "乌兰察布市",
            "通辽市",
            "赤峰市",
            "鄂尔多斯市",
            "巴彦淖尔市",
            "锡林郭勒盟",
            "兴安盟",
            "阿拉善盟"
        ],
            "cities": {
            "呼伦贝尔市": {
                "id": 451,
                    "areasArr": [
                    "海拉尔区",
                    "阿荣旗",
                    "莫力达瓦达斡尔族自治旗",
                    "鄂伦春自治旗",
                    "鄂温克族自治旗",
                    "陈巴尔虎旗",
                    "新巴尔虎左旗",
                    "新巴尔虎右旗",
                    "满洲里市",
                    "牙克石市",
                    "扎兰屯市",
                    "额尔古纳市",
                    "根河市",
                    "市辖区"
                ],
                    "areas": {
                    "海拉尔区": {
                        "id": 3724
                    },
                    "阿荣旗": {
                        "id": 3725
                    },
                    "莫力达瓦达斡尔族自治旗": {
                        "id": 3726
                    },
                    "鄂伦春自治旗": {
                        "id": 3727
                    },
                    "鄂温克族自治旗": {
                        "id": 3728
                    },
                    "陈巴尔虎旗": {
                        "id": 3729
                    },
                    "新巴尔虎左旗": {
                        "id": 3730
                    },
                    "新巴尔虎右旗": {
                        "id": 3731
                    },
                    "满洲里市": {
                        "id": 3732
                    },
                    "牙克石市": {
                        "id": 3733
                    },
                    "扎兰屯市": {
                        "id": 3734
                    },
                    "额尔古纳市": {
                        "id": 3735
                    },
                    "根河市": {
                        "id": 3736
                    },
                    "市辖区": {
                        "id": 3881
                    }
                }
            },
            "呼和浩特市": {
                "id": 452,
                    "areasArr": [
                    "新城区",
                    "回民区",
                    "玉泉区",
                    "赛罕区",
                    "土默特左旗",
                    "托克托县",
                    "和林格尔县",
                    "清水河县",
                    "武川县",
                    "市辖区"
                ],
                    "areas": {
                    "新城区": {
                        "id": 3737
                    },
                    "回民区": {
                        "id": 3738
                    },
                    "玉泉区": {
                        "id": 3739
                    },
                    "赛罕区": {
                        "id": 3740
                    },
                    "土默特左旗": {
                        "id": 3741
                    },
                    "托克托县": {
                        "id": 3742
                    },
                    "和林格尔县": {
                        "id": 3743
                    },
                    "清水河县": {
                        "id": 3744
                    },
                    "武川县": {
                        "id": 3745
                    },
                    "市辖区": {
                        "id": 3875
                    }
                }
            },
            "包头市": {
                "id": 453,
                    "areasArr": [
                    "东河区",
                    "昆都仑区",
                    "青山区",
                    "石拐区",
                    "白云鄂博矿区",
                    "九原区",
                    "土默特右旗",
                    "固阳县",
                    "达尔罕茂明安联合旗",
                    "市辖区"
                ],
                    "areas": {
                    "东河区": {
                        "id": 3746
                    },
                    "昆都仑区": {
                        "id": 3747
                    },
                    "青山区": {
                        "id": 3748
                    },
                    "石拐区": {
                        "id": 3749
                    },
                    "白云鄂博矿区": {
                        "id": 3750
                    },
                    "九原区": {
                        "id": 3751
                    },
                    "土默特右旗": {
                        "id": 3752
                    },
                    "固阳县": {
                        "id": 3753
                    },
                    "达尔罕茂明安联合旗": {
                        "id": 3754
                    },
                    "市辖区": {
                        "id": 3876
                    }
                }
            },
            "乌海市": {
                "id": 454,
                    "areasArr": [
                    "海勃湾区",
                    "海南区",
                    "乌达区",
                    "市辖区"
                ],
                    "areas": {
                    "海勃湾区": {
                        "id": 3755
                    },
                    "海南区": {
                        "id": 3756
                    },
                    "乌达区": {
                        "id": 3757
                    },
                    "市辖区": {
                        "id": 3877
                    }
                }
            },
            "乌兰察布市": {
                "id": 455,
                    "areasArr": [
                    "集宁区",
                    "卓资县",
                    "化德县",
                    "商都县",
                    "兴和县",
                    "凉城县",
                    "察哈尔右翼前旗",
                    "察哈尔右翼中旗",
                    "察哈尔右翼后旗",
                    "四子王旗",
                    "丰镇市",
                    "市辖区"
                ],
                    "areas": {
                    "集宁区": {
                        "id": 3758
                    },
                    "卓资县": {
                        "id": 3759
                    },
                    "化德县": {
                        "id": 3760
                    },
                    "商都县": {
                        "id": 3761
                    },
                    "兴和县": {
                        "id": 3762
                    },
                    "凉城县": {
                        "id": 3763
                    },
                    "察哈尔右翼前旗": {
                        "id": 3764
                    },
                    "察哈尔右翼中旗": {
                        "id": 3765
                    },
                    "察哈尔右翼后旗": {
                        "id": 3766
                    },
                    "四子王旗": {
                        "id": 3767
                    },
                    "丰镇市": {
                        "id": 3768
                    },
                    "市辖区": {
                        "id": 3883
                    }
                }
            },
            "通辽市": {
                "id": 456,
                    "areasArr": [
                    "科尔沁区",
                    "科尔沁左翼中旗",
                    "科尔沁左翼后旗",
                    "开鲁县",
                    "库伦旗",
                    "奈曼旗",
                    "扎鲁特旗",
                    "霍林郭勒市",
                    "市辖区"
                ],
                    "areas": {
                    "科尔沁区": {
                        "id": 3769
                    },
                    "科尔沁左翼中旗": {
                        "id": 3770
                    },
                    "科尔沁左翼后旗": {
                        "id": 3771
                    },
                    "开鲁县": {
                        "id": 3772
                    },
                    "库伦旗": {
                        "id": 3773
                    },
                    "奈曼旗": {
                        "id": 3774
                    },
                    "扎鲁特旗": {
                        "id": 3775
                    },
                    "霍林郭勒市": {
                        "id": 3776
                    },
                    "市辖区": {
                        "id": 3879
                    }
                }
            },
            "赤峰市": {
                "id": 457,
                    "areasArr": [
                    "红山区",
                    "元宝山区",
                    "松山区",
                    "阿鲁科尔沁旗",
                    "巴林左旗",
                    "巴林右旗",
                    "林西县",
                    "克什克腾旗",
                    "翁牛特旗",
                    "喀喇沁旗",
                    "宁城县",
                    "敖汉旗",
                    "市辖区"
                ],
                    "areas": {
                    "红山区": {
                        "id": 3777
                    },
                    "元宝山区": {
                        "id": 3778
                    },
                    "松山区": {
                        "id": 3779
                    },
                    "阿鲁科尔沁旗": {
                        "id": 3780
                    },
                    "巴林左旗": {
                        "id": 3781
                    },
                    "巴林右旗": {
                        "id": 3782
                    },
                    "林西县": {
                        "id": 3783
                    },
                    "克什克腾旗": {
                        "id": 3784
                    },
                    "翁牛特旗": {
                        "id": 3785
                    },
                    "喀喇沁旗": {
                        "id": 3786
                    },
                    "宁城县": {
                        "id": 3787
                    },
                    "敖汉旗": {
                        "id": 3788
                    },
                    "市辖区": {
                        "id": 3878
                    }
                }
            },
            "鄂尔多斯市": {
                "id": 458,
                    "areasArr": [
                    "东胜区",
                    "达拉特旗",
                    "准格尔旗",
                    "鄂托克前旗",
                    "鄂托克旗",
                    "杭锦旗",
                    "乌审旗",
                    "伊金霍洛旗",
                    "市辖区"
                ],
                    "areas": {
                    "东胜区": {
                        "id": 3789
                    },
                    "达拉特旗": {
                        "id": 3790
                    },
                    "准格尔旗": {
                        "id": 3791
                    },
                    "鄂托克前旗": {
                        "id": 3792
                    },
                    "鄂托克旗": {
                        "id": 3793
                    },
                    "杭锦旗": {
                        "id": 3794
                    },
                    "乌审旗": {
                        "id": 3795
                    },
                    "伊金霍洛旗": {
                        "id": 3796
                    },
                    "市辖区": {
                        "id": 3880
                    }
                }
            },
            "巴彦淖尔市": {
                "id": 459,
                    "areasArr": [
                    "临河区",
                    "五原县",
                    "磴口县",
                    "乌拉特前旗",
                    "乌拉特中旗",
                    "乌拉特后旗",
                    "杭锦后旗",
                    "市辖区"
                ],
                    "areas": {
                    "临河区": {
                        "id": 3797
                    },
                    "五原县": {
                        "id": 3798
                    },
                    "磴口县": {
                        "id": 3799
                    },
                    "乌拉特前旗": {
                        "id": 3800
                    },
                    "乌拉特中旗": {
                        "id": 3801
                    },
                    "乌拉特后旗": {
                        "id": 3802
                    },
                    "杭锦后旗": {
                        "id": 3803
                    },
                    "市辖区": {
                        "id": 3882
                    }
                }
            },
            "锡林郭勒盟": {
                "id": 460,
                    "areasArr": [
                    "二连浩特市",
                    "锡林浩特市",
                    "阿巴嘎旗",
                    "苏尼特左旗",
                    "苏尼特右旗",
                    "东乌珠穆沁旗",
                    "西乌珠穆沁旗",
                    "太仆寺旗",
                    "镶黄旗",
                    "正镶白旗",
                    "正蓝旗",
                    "多伦县"
                ],
                    "areas": {
                    "二连浩特市": {
                        "id": 3804
                    },
                    "锡林浩特市": {
                        "id": 3805
                    },
                    "阿巴嘎旗": {
                        "id": 3806
                    },
                    "苏尼特左旗": {
                        "id": 3807
                    },
                    "苏尼特右旗": {
                        "id": 3808
                    },
                    "东乌珠穆沁旗": {
                        "id": 3809
                    },
                    "西乌珠穆沁旗": {
                        "id": 3810
                    },
                    "太仆寺旗": {
                        "id": 3811
                    },
                    "镶黄旗": {
                        "id": 3812
                    },
                    "正镶白旗": {
                        "id": 3813
                    },
                    "正蓝旗": {
                        "id": 3814
                    },
                    "多伦县": {
                        "id": 3815
                    }
                }
            },
            "兴安盟": {
                "id": 461,
                    "areasArr": [
                    "乌兰浩特市",
                    "阿尔山市",
                    "科尔沁右翼前旗",
                    "科尔沁右翼中旗",
                    "扎赉特旗",
                    "突泉县"
                ],
                    "areas": {
                    "乌兰浩特市": {
                        "id": 3816
                    },
                    "阿尔山市": {
                        "id": 3817
                    },
                    "科尔沁右翼前旗": {
                        "id": 3818
                    },
                    "科尔沁右翼中旗": {
                        "id": 3819
                    },
                    "扎赉特旗": {
                        "id": 3820
                    },
                    "突泉县": {
                        "id": 3821
                    }
                }
            },
            "阿拉善盟": {
                "id": 462,
                    "areasArr": [
                    "阿拉善左旗",
                    "阿拉善右旗",
                    "额济纳旗"
                ],
                    "areas": {
                    "阿拉善左旗": {
                        "id": 3822
                    },
                    "阿拉善右旗": {
                        "id": 3823
                    },
                    "额济纳旗": {
                        "id": 3824
                    }
                }
            }
        }
    },
    "辽宁省": {
        "id": 16,
            "citiesArr": [
            "沈阳市",
            "铁岭市",
            "大连市",
            "鞍山市",
            "抚顺市",
            "本溪市",
            "丹东市",
            "锦州市",
            "营口市",
            "阜新市",
            "辽阳市",
            "朝阳市",
            "盘锦市",
            "葫芦岛市"
        ],
            "cities": {
            "沈阳市": {
                "id": 127,
                    "areasArr": [
                    "和平区",
                    "沈河区",
                    "大东区",
                    "皇姑区",
                    "铁西区",
                    "苏家屯区",
                    "东陵区",
                    "沈北新区",
                    "于洪区",
                    "辽中县",
                    "康平县",
                    "法库县",
                    "新民市",
                    "市辖区"
                ],
                    "areas": {
                    "和平区": {
                        "id": 1381
                    },
                    "沈河区": {
                        "id": 1382
                    },
                    "大东区": {
                        "id": 1383
                    },
                    "皇姑区": {
                        "id": 1384
                    },
                    "铁西区": {
                        "id": 1385
                    },
                    "苏家屯区": {
                        "id": 1386
                    },
                    "东陵区": {
                        "id": 1387
                    },
                    "沈北新区": {
                        "id": 1388
                    },
                    "于洪区": {
                        "id": 1389
                    },
                    "辽中县": {
                        "id": 1390
                    },
                    "康平县": {
                        "id": 1391
                    },
                    "法库县": {
                        "id": 1392
                    },
                    "新民市": {
                        "id": 1393
                    },
                    "市辖区": {
                        "id": 3884
                    }
                }
            },
            "铁岭市": {
                "id": 128,
                    "areasArr": [
                    "银州区",
                    "清河区",
                    "铁岭县",
                    "西丰县",
                    "昌图县",
                    "调兵山市",
                    "开原市",
                    "市辖区"
                ],
                    "areas": {
                    "银州区": {
                        "id": 1394
                    },
                    "清河区": {
                        "id": 1395
                    },
                    "铁岭县": {
                        "id": 1396
                    },
                    "西丰县": {
                        "id": 1397
                    },
                    "昌图县": {
                        "id": 1398
                    },
                    "调兵山市": {
                        "id": 1399
                    },
                    "开原市": {
                        "id": 1400
                    },
                    "市辖区": {
                        "id": 3895
                    }
                }
            },
            "大连市": {
                "id": 129,
                    "areasArr": [
                    "长海县",
                    "旅顺口区",
                    "中山区",
                    "西岗区",
                    "沙河口区",
                    "甘井子区",
                    "金州区",
                    "普兰店市",
                    "瓦房店市",
                    "庄河市",
                    "市辖区"
                ],
                    "areas": {
                    "长海县": {
                        "id": 1401
                    },
                    "旅顺口区": {
                        "id": 1402
                    },
                    "中山区": {
                        "id": 1403
                    },
                    "西岗区": {
                        "id": 1404
                    },
                    "沙河口区": {
                        "id": 1405
                    },
                    "甘井子区": {
                        "id": 1406
                    },
                    "金州区": {
                        "id": 1407
                    },
                    "普兰店市": {
                        "id": 1408
                    },
                    "瓦房店市": {
                        "id": 1409
                    },
                    "庄河市": {
                        "id": 1410
                    },
                    "市辖区": {
                        "id": 3885
                    }
                }
            },
            "鞍山市": {
                "id": 130,
                    "areasArr": [
                    "铁东区",
                    "铁西区",
                    "立山区",
                    "千山区",
                    "台安县",
                    "岫岩满族自治县",
                    "海城市",
                    "市辖区"
                ],
                    "areas": {
                    "铁东区": {
                        "id": 1411
                    },
                    "铁西区": {
                        "id": 1412
                    },
                    "立山区": {
                        "id": 1413
                    },
                    "千山区": {
                        "id": 1414
                    },
                    "台安县": {
                        "id": 1415
                    },
                    "岫岩满族自治县": {
                        "id": 1416
                    },
                    "海城市": {
                        "id": 1417
                    },
                    "市辖区": {
                        "id": 3886
                    }
                }
            },
            "抚顺市": {
                "id": 131,
                    "areasArr": [
                    "新抚区",
                    "东洲区",
                    "望花区",
                    "顺城区",
                    "抚顺县",
                    "新宾满族自治县",
                    "清原满族自治县",
                    "市辖区"
                ],
                    "areas": {
                    "新抚区": {
                        "id": 1418
                    },
                    "东洲区": {
                        "id": 1419
                    },
                    "望花区": {
                        "id": 1420
                    },
                    "顺城区": {
                        "id": 1421
                    },
                    "抚顺县": {
                        "id": 1422
                    },
                    "新宾满族自治县": {
                        "id": 1423
                    },
                    "清原满族自治县": {
                        "id": 1424
                    },
                    "市辖区": {
                        "id": 3887
                    }
                }
            },
            "本溪市": {
                "id": 132,
                    "areasArr": [
                    "平山区",
                    "溪湖区",
                    "明山区",
                    "南芬区",
                    "本溪满族自治县",
                    "桓仁满族自治县",
                    "市辖区"
                ],
                    "areas": {
                    "平山区": {
                        "id": 1425
                    },
                    "溪湖区": {
                        "id": 1426
                    },
                    "明山区": {
                        "id": 1427
                    },
                    "南芬区": {
                        "id": 1428
                    },
                    "本溪满族自治县": {
                        "id": 1429
                    },
                    "桓仁满族自治县": {
                        "id": 1430
                    },
                    "市辖区": {
                        "id": 3888
                    }
                }
            },
            "丹东市": {
                "id": 133,
                    "areasArr": [
                    "元宝区",
                    "振兴区",
                    "振安区",
                    "宽甸满族自治县",
                    "东港市",
                    "凤城市",
                    "市辖区"
                ],
                    "areas": {
                    "元宝区": {
                        "id": 1431
                    },
                    "振兴区": {
                        "id": 1432
                    },
                    "振安区": {
                        "id": 1433
                    },
                    "宽甸满族自治县": {
                        "id": 1434
                    },
                    "东港市": {
                        "id": 1435
                    },
                    "凤城市": {
                        "id": 1436
                    },
                    "市辖区": {
                        "id": 3889
                    }
                }
            },
            "锦州市": {
                "id": 134,
                    "areasArr": [
                    "古塔区",
                    "凌河区",
                    "太和区",
                    "黑山县",
                    "义县",
                    "凌海市",
                    "北镇市",
                    "市辖区"
                ],
                    "areas": {
                    "古塔区": {
                        "id": 1437
                    },
                    "凌河区": {
                        "id": 1438
                    },
                    "太和区": {
                        "id": 1439
                    },
                    "黑山县": {
                        "id": 1440
                    },
                    "义县": {
                        "id": 1441
                    },
                    "凌海市": {
                        "id": 1442
                    },
                    "北镇市": {
                        "id": 1443
                    },
                    "市辖区": {
                        "id": 3890
                    }
                }
            },
            "营口市": {
                "id": 135,
                    "areasArr": [
                    "站前区",
                    "西市区",
                    "鮁鱼圈区",
                    "老边区",
                    "盖州市",
                    "大石桥市",
                    "市辖区"
                ],
                    "areas": {
                    "站前区": {
                        "id": 1444
                    },
                    "西市区": {
                        "id": 1445
                    },
                    "鮁鱼圈区": {
                        "id": 1446
                    },
                    "老边区": {
                        "id": 1447
                    },
                    "盖州市": {
                        "id": 1448
                    },
                    "大石桥市": {
                        "id": 1449
                    },
                    "市辖区": {
                        "id": 3891
                    }
                }
            },
            "阜新市": {
                "id": 136,
                    "areasArr": [
                    "海州区",
                    "新邱区",
                    "太平区",
                    "清河门区",
                    "细河区",
                    "阜新蒙古族自治县",
                    "彰武县",
                    "市辖区"
                ],
                    "areas": {
                    "海州区": {
                        "id": 1450
                    },
                    "新邱区": {
                        "id": 1451
                    },
                    "太平区": {
                        "id": 1452
                    },
                    "清河门区": {
                        "id": 1453
                    },
                    "细河区": {
                        "id": 1454
                    },
                    "阜新蒙古族自治县": {
                        "id": 1455
                    },
                    "彰武县": {
                        "id": 1456
                    },
                    "市辖区": {
                        "id": 3892
                    }
                }
            },
            "辽阳市": {
                "id": 137,
                    "areasArr": [
                    "白塔区",
                    "文圣区",
                    "宏伟区",
                    "弓长岭区",
                    "太子河区",
                    "辽阳县",
                    "灯塔市",
                    "市辖区"
                ],
                    "areas": {
                    "白塔区": {
                        "id": 1457
                    },
                    "文圣区": {
                        "id": 1458
                    },
                    "宏伟区": {
                        "id": 1459
                    },
                    "弓长岭区": {
                        "id": 1460
                    },
                    "太子河区": {
                        "id": 1461
                    },
                    "辽阳县": {
                        "id": 1462
                    },
                    "灯塔市": {
                        "id": 1463
                    },
                    "市辖区": {
                        "id": 3893
                    }
                }
            },
            "朝阳市": {
                "id": 138,
                    "areasArr": [
                    "双塔区",
                    "龙城区",
                    "朝阳县",
                    "建平县",
                    "喀喇沁左翼蒙古族自治县",
                    "北票市",
                    "凌源市",
                    "市辖区"
                ],
                    "areas": {
                    "双塔区": {
                        "id": 1464
                    },
                    "龙城区": {
                        "id": 1465
                    },
                    "朝阳县": {
                        "id": 1466
                    },
                    "建平县": {
                        "id": 1467
                    },
                    "喀喇沁左翼蒙古族自治县": {
                        "id": 1468
                    },
                    "北票市": {
                        "id": 1469
                    },
                    "凌源市": {
                        "id": 1470
                    },
                    "市辖区": {
                        "id": 3896
                    }
                }
            },
            "盘锦市": {
                "id": 139,
                    "areasArr": [
                    "双台子区",
                    "兴隆台区",
                    "大洼县",
                    "盘山县",
                    "市辖区"
                ],
                    "areas": {
                    "双台子区": {
                        "id": 1471
                    },
                    "兴隆台区": {
                        "id": 1472
                    },
                    "大洼县": {
                        "id": 1473
                    },
                    "盘山县": {
                        "id": 1474
                    },
                    "市辖区": {
                        "id": 3894
                    }
                }
            },
            "葫芦岛市": {
                "id": 140,
                    "areasArr": [
                    "连山区",
                    "龙港区",
                    "南票区",
                    "绥中县",
                    "建昌县",
                    "兴城市",
                    "市辖区"
                ],
                    "areas": {
                    "连山区": {
                        "id": 1475
                    },
                    "龙港区": {
                        "id": 1476
                    },
                    "南票区": {
                        "id": 1477
                    },
                    "绥中县": {
                        "id": 1478
                    },
                    "建昌县": {
                        "id": 1479
                    },
                    "兴城市": {
                        "id": 1480
                    },
                    "市辖区": {
                        "id": 3897
                    }
                }
            }
        }
    },
    "吉林省": {
        "id": 17,
            "citiesArr": [
            "长春市",
            "吉林市",
            "延边朝鲜族自治州",
            "四平市",
            "通化市",
            "白城市",
            "辽源市",
            "松原市",
            "白山市"
        ],
            "cities": {
            "长春市": {
                "id": 141,
                    "areasArr": [
                    "南关区",
                    "宽城区",
                    "朝阳区",
                    "二道区",
                    "绿园区",
                    "双阳区",
                    "农安县",
                    "九台市",
                    "榆树市",
                    "德惠市",
                    "市辖区"
                ],
                    "areas": {
                    "南关区": {
                        "id": 1481
                    },
                    "宽城区": {
                        "id": 1482
                    },
                    "朝阳区": {
                        "id": 1483
                    },
                    "二道区": {
                        "id": 1484
                    },
                    "绿园区": {
                        "id": 1485
                    },
                    "双阳区": {
                        "id": 1486
                    },
                    "农安县": {
                        "id": 1487
                    },
                    "九台市": {
                        "id": 1488
                    },
                    "榆树市": {
                        "id": 1489
                    },
                    "德惠市": {
                        "id": 1490
                    },
                    "市辖区": {
                        "id": 3898
                    }
                }
            },
            "吉林市": {
                "id": 142,
                    "areasArr": [
                    "昌邑区",
                    "龙潭区",
                    "船营区",
                    "丰满区",
                    "永吉县",
                    "蛟河市",
                    "桦甸市",
                    "舒兰市",
                    "磐石市",
                    "市辖区"
                ],
                    "areas": {
                    "昌邑区": {
                        "id": 1491
                    },
                    "龙潭区": {
                        "id": 1492
                    },
                    "船营区": {
                        "id": 1493
                    },
                    "丰满区": {
                        "id": 1494
                    },
                    "永吉县": {
                        "id": 1495
                    },
                    "蛟河市": {
                        "id": 1496
                    },
                    "桦甸市": {
                        "id": 1497
                    },
                    "舒兰市": {
                        "id": 1498
                    },
                    "磐石市": {
                        "id": 1499
                    },
                    "市辖区": {
                        "id": 3899
                    }
                }
            },
            "延边朝鲜族自治州": {
                "id": 143,
                    "areasArr": [
                    "延吉市",
                    "图们市",
                    "敦化市",
                    "珲春市",
                    "龙井市",
                    "和龙市",
                    "汪清县",
                    "安图县"
                ],
                    "areas": {
                    "延吉市": {
                        "id": 1500
                    },
                    "图们市": {
                        "id": 1501
                    },
                    "敦化市": {
                        "id": 1502
                    },
                    "珲春市": {
                        "id": 1503
                    },
                    "龙井市": {
                        "id": 1504
                    },
                    "和龙市": {
                        "id": 1505
                    },
                    "汪清县": {
                        "id": 1506
                    },
                    "安图县": {
                        "id": 1507
                    }
                }
            },
            "四平市": {
                "id": 144,
                    "areasArr": [
                    "铁西区",
                    "铁东区",
                    "梨树县",
                    "伊通满族自治县",
                    "公主岭市",
                    "双辽市",
                    "市辖区"
                ],
                    "areas": {
                    "铁西区": {
                        "id": 1508
                    },
                    "铁东区": {
                        "id": 1509
                    },
                    "梨树县": {
                        "id": 1510
                    },
                    "伊通满族自治县": {
                        "id": 1511
                    },
                    "公主岭市": {
                        "id": 1512
                    },
                    "双辽市": {
                        "id": 1513
                    },
                    "市辖区": {
                        "id": 3900
                    }
                }
            },
            "通化市": {
                "id": 145,
                    "areasArr": [
                    "东昌区",
                    "二道江区",
                    "通化县",
                    "辉南县",
                    "柳河县",
                    "梅河口市",
                    "集安市",
                    "市辖区"
                ],
                    "areas": {
                    "东昌区": {
                        "id": 1514
                    },
                    "二道江区": {
                        "id": 1515
                    },
                    "通化县": {
                        "id": 1516
                    },
                    "辉南县": {
                        "id": 1517
                    },
                    "柳河县": {
                        "id": 1518
                    },
                    "梅河口市": {
                        "id": 1519
                    },
                    "集安市": {
                        "id": 1520
                    },
                    "市辖区": {
                        "id": 3902
                    }
                }
            },
            "白城市": {
                "id": 146,
                    "areasArr": [
                    "洮北区",
                    "镇赉县",
                    "通榆县",
                    "洮南市",
                    "大安市",
                    "市辖区"
                ],
                    "areas": {
                    "洮北区": {
                        "id": 1521
                    },
                    "镇赉县": {
                        "id": 1522
                    },
                    "通榆县": {
                        "id": 1523
                    },
                    "洮南市": {
                        "id": 1524
                    },
                    "大安市": {
                        "id": 1525
                    },
                    "市辖区": {
                        "id": 3905
                    }
                }
            },
            "辽源市": {
                "id": 147,
                    "areasArr": [
                    "龙山区",
                    "西安区",
                    "东丰县",
                    "东辽县",
                    "市辖区"
                ],
                    "areas": {
                    "龙山区": {
                        "id": 1526
                    },
                    "西安区": {
                        "id": 1527
                    },
                    "东丰县": {
                        "id": 1528
                    },
                    "东辽县": {
                        "id": 1529
                    },
                    "市辖区": {
                        "id": 3901
                    }
                }
            },
            "松原市": {
                "id": 148,
                    "areasArr": [
                    "宁江区",
                    "前郭尔罗斯蒙古族自治县",
                    "长岭县",
                    "乾安县",
                    "扶余县",
                    "市辖区"
                ],
                    "areas": {
                    "宁江区": {
                        "id": 1530
                    },
                    "前郭尔罗斯蒙古族自治县": {
                        "id": 1531
                    },
                    "长岭县": {
                        "id": 1532
                    },
                    "乾安县": {
                        "id": 1533
                    },
                    "扶余县": {
                        "id": 1534
                    },
                    "市辖区": {
                        "id": 3904
                    }
                }
            },
            "白山市": {
                "id": 149,
                    "areasArr": [
                    "八道江区",
                    "江源区",
                    "抚松县",
                    "靖宇县",
                    "长白朝鲜族自治县",
                    "临江市",
                    "市辖区"
                ],
                    "areas": {
                    "八道江区": {
                        "id": 1535
                    },
                    "江源区": {
                        "id": 1536
                    },
                    "抚松县": {
                        "id": 1537
                    },
                    "靖宇县": {
                        "id": 1538
                    },
                    "长白朝鲜族自治县": {
                        "id": 1539
                    },
                    "临江市": {
                        "id": 1540
                    },
                    "市辖区": {
                        "id": 3903
                    }
                }
            }
        }
    },
    "黑龙江省": {
        "id": 18,
            "citiesArr": [
            "哈尔滨市",
            "齐齐哈尔市",
            "鸡西市",
            "牡丹江市",
            "七台河市",
            "佳木斯市",
            "鹤岗市",
            "双鸭山市",
            "绥化市",
            "黑河市",
            "大兴安岭地区",
            "伊春市",
            "大庆市"
        ],
            "cities": {
            "哈尔滨市": {
                "id": 150,
                    "areasArr": [
                    "道里区",
                    "南岗区",
                    "道外区",
                    "平房区",
                    "松北区",
                    "香坊区",
                    "呼兰区",
                    "阿城区",
                    "依兰县",
                    "方正县",
                    "宾县",
                    "巴彦县",
                    "木兰县",
                    "通河县",
                    "延寿县",
                    "双城市",
                    "尚志市",
                    "五常市",
                    "市辖区"
                ],
                    "areas": {
                    "道里区": {
                        "id": 1541
                    },
                    "南岗区": {
                        "id": 1542
                    },
                    "道外区": {
                        "id": 1543
                    },
                    "平房区": {
                        "id": 1544
                    },
                    "松北区": {
                        "id": 1545
                    },
                    "香坊区": {
                        "id": 1546
                    },
                    "呼兰区": {
                        "id": 1547
                    },
                    "阿城区": {
                        "id": 1548
                    },
                    "依兰县": {
                        "id": 1549
                    },
                    "方正县": {
                        "id": 1550
                    },
                    "宾县": {
                        "id": 1551
                    },
                    "巴彦县": {
                        "id": 1552
                    },
                    "木兰县": {
                        "id": 1553
                    },
                    "通河县": {
                        "id": 1554
                    },
                    "延寿县": {
                        "id": 1555
                    },
                    "双城市": {
                        "id": 1556
                    },
                    "尚志市": {
                        "id": 1557
                    },
                    "五常市": {
                        "id": 1558
                    },
                    "市辖区": {
                        "id": 3906
                    }
                }
            },
            "齐齐哈尔市": {
                "id": 151,
                    "areasArr": [
                    "龙沙区",
                    "建华区",
                    "铁锋区",
                    "昂昂溪区",
                    "富拉尔基区",
                    "碾子山区",
                    "梅里斯达翰尔族区",
                    "龙江县",
                    "依安县",
                    "泰来县",
                    "甘南县",
                    "富裕县",
                    "克山县",
                    "克东县",
                    "拜泉县",
                    "讷河市",
                    "市辖区"
                ],
                    "areas": {
                    "龙沙区": {
                        "id": 1559
                    },
                    "建华区": {
                        "id": 1560
                    },
                    "铁锋区": {
                        "id": 1561
                    },
                    "昂昂溪区": {
                        "id": 1562
                    },
                    "富拉尔基区": {
                        "id": 1563
                    },
                    "碾子山区": {
                        "id": 1564
                    },
                    "梅里斯达翰尔族区": {
                        "id": 1565
                    },
                    "龙江县": {
                        "id": 1566
                    },
                    "依安县": {
                        "id": 1567
                    },
                    "泰来县": {
                        "id": 1568
                    },
                    "甘南县": {
                        "id": 1569
                    },
                    "富裕县": {
                        "id": 1570
                    },
                    "克山县": {
                        "id": 1571
                    },
                    "克东县": {
                        "id": 1572
                    },
                    "拜泉县": {
                        "id": 1573
                    },
                    "讷河市": {
                        "id": 1574
                    },
                    "市辖区": {
                        "id": 3907
                    }
                }
            },
            "鸡西市": {
                "id": 152,
                    "areasArr": [
                    "鸡冠区",
                    "恒山区",
                    "滴道区",
                    "梨树区",
                    "城子河区",
                    "麻山区",
                    "鸡东县",
                    "虎林市",
                    "密山市",
                    "市辖区"
                ],
                    "areas": {
                    "鸡冠区": {
                        "id": 1575
                    },
                    "恒山区": {
                        "id": 1576
                    },
                    "滴道区": {
                        "id": 1577
                    },
                    "梨树区": {
                        "id": 1578
                    },
                    "城子河区": {
                        "id": 1579
                    },
                    "麻山区": {
                        "id": 1580
                    },
                    "鸡东县": {
                        "id": 1581
                    },
                    "虎林市": {
                        "id": 1582
                    },
                    "密山市": {
                        "id": 1583
                    },
                    "市辖区": {
                        "id": 3908
                    }
                }
            },
            "牡丹江市": {
                "id": 153,
                    "areasArr": [
                    "东安区",
                    "阳明区",
                    "爱民区",
                    "西安区",
                    "东宁县",
                    "林口县",
                    "绥芬河市",
                    "海林市",
                    "宁安市",
                    "穆棱市",
                    "市辖区"
                ],
                    "areas": {
                    "东安区": {
                        "id": 1584
                    },
                    "阳明区": {
                        "id": 1585
                    },
                    "爱民区": {
                        "id": 1586
                    },
                    "西安区": {
                        "id": 1587
                    },
                    "东宁县": {
                        "id": 1588
                    },
                    "林口县": {
                        "id": 1589
                    },
                    "绥芬河市": {
                        "id": 1590
                    },
                    "海林市": {
                        "id": 1591
                    },
                    "宁安市": {
                        "id": 1592
                    },
                    "穆棱市": {
                        "id": 1593
                    },
                    "市辖区": {
                        "id": 3915
                    }
                }
            },
            "七台河市": {
                "id": 154,
                    "areasArr": [
                    "新兴区",
                    "桃山区",
                    "茄子河区",
                    "勃利县",
                    "市辖区"
                ],
                    "areas": {
                    "新兴区": {
                        "id": 1594
                    },
                    "桃山区": {
                        "id": 1595
                    },
                    "茄子河区": {
                        "id": 1596
                    },
                    "勃利县": {
                        "id": 1597
                    },
                    "市辖区": {
                        "id": 3914
                    }
                }
            },
            "佳木斯市": {
                "id": 155,
                    "areasArr": [
                    "向阳区",
                    "前进区",
                    "东风区",
                    "桦南县",
                    "桦川县",
                    "汤原县",
                    "抚远县",
                    "同江市",
                    "富锦市",
                    "市辖区",
                    "郊区"
                ],
                    "areas": {
                    "向阳区": {
                        "id": 1598
                    },
                    "前进区": {
                        "id": 1599
                    },
                    "东风区": {
                        "id": 1600
                    },
                    "桦南县": {
                        "id": 1601
                    },
                    "桦川县": {
                        "id": 1602
                    },
                    "汤原县": {
                        "id": 1603
                    },
                    "抚远县": {
                        "id": 1604
                    },
                    "同江市": {
                        "id": 1605
                    },
                    "富锦市": {
                        "id": 1606
                    },
                    "市辖区": {
                        "id": 3913
                    },
                    "郊区": {
                        "id": 4139
                    }
                }
            },
            "鹤岗市": {
                "id": 156,
                    "areasArr": [
                    "向阳区",
                    "工农区",
                    "南山区",
                    "兴安区",
                    "东山区",
                    "兴山区",
                    "萝北县",
                    "绥滨县",
                    "市辖区"
                ],
                    "areas": {
                    "向阳区": {
                        "id": 1607
                    },
                    "工农区": {
                        "id": 1608
                    },
                    "南山区": {
                        "id": 1609
                    },
                    "兴安区": {
                        "id": 1610
                    },
                    "东山区": {
                        "id": 1611
                    },
                    "兴山区": {
                        "id": 1612
                    },
                    "萝北县": {
                        "id": 1613
                    },
                    "绥滨县": {
                        "id": 1614
                    },
                    "市辖区": {
                        "id": 3909
                    }
                }
            },
            "双鸭山市": {
                "id": 157,
                    "areasArr": [
                    "尖山区",
                    "岭东区",
                    "四方台区",
                    "宝山区",
                    "集贤县",
                    "友谊县",
                    "宝清县",
                    "饶河县",
                    "市辖区"
                ],
                    "areas": {
                    "尖山区": {
                        "id": 1615
                    },
                    "岭东区": {
                        "id": 1616
                    },
                    "四方台区": {
                        "id": 1617
                    },
                    "宝山区": {
                        "id": 1618
                    },
                    "集贤县": {
                        "id": 1619
                    },
                    "友谊县": {
                        "id": 1620
                    },
                    "宝清县": {
                        "id": 1621
                    },
                    "饶河县": {
                        "id": 1622
                    },
                    "市辖区": {
                        "id": 3910
                    }
                }
            },
            "绥化市": {
                "id": 158,
                    "areasArr": [
                    "北林区",
                    "望奎县",
                    "兰西县",
                    "青冈县",
                    "庆安县",
                    "明水县",
                    "绥棱县",
                    "安达市",
                    "肇东市",
                    "海伦市",
                    "市辖区"
                ],
                    "areas": {
                    "北林区": {
                        "id": 1623
                    },
                    "望奎县": {
                        "id": 1624
                    },
                    "兰西县": {
                        "id": 1625
                    },
                    "青冈县": {
                        "id": 1626
                    },
                    "庆安县": {
                        "id": 1627
                    },
                    "明水县": {
                        "id": 1628
                    },
                    "绥棱县": {
                        "id": 1629
                    },
                    "安达市": {
                        "id": 1630
                    },
                    "肇东市": {
                        "id": 1631
                    },
                    "海伦市": {
                        "id": 1632
                    },
                    "市辖区": {
                        "id": 3917
                    }
                }
            },
            "黑河市": {
                "id": 159,
                    "areasArr": [
                    "爱辉区",
                    "嫩江县",
                    "逊克县",
                    "孙吴县",
                    "北安市",
                    "五大连池市",
                    "市辖区"
                ],
                    "areas": {
                    "爱辉区": {
                        "id": 1633
                    },
                    "嫩江县": {
                        "id": 1634
                    },
                    "逊克县": {
                        "id": 1635
                    },
                    "孙吴县": {
                        "id": 1636
                    },
                    "北安市": {
                        "id": 1637
                    },
                    "五大连池市": {
                        "id": 1638
                    },
                    "市辖区": {
                        "id": 3916
                    }
                }
            },
            "大兴安岭地区": {
                "id": 160,
                    "areasArr": [
                    "呼玛县",
                    "塔河县",
                    "漠河县",
                    "加格达奇区",
                    "松岭区",
                    "新林区",
                    "呼中区"
                ],
                    "areas": {
                    "呼玛县": {
                        "id": 1639
                    },
                    "塔河县": {
                        "id": 1640
                    },
                    "漠河县": {
                        "id": 1641
                    },
                    "加格达奇区": {
                        "id": 4140
                    },
                    "松岭区": {
                        "id": 4141
                    },
                    "新林区": {
                        "id": 4142
                    },
                    "呼中区": {
                        "id": 4143
                    }
                }
            },
            "伊春市": {
                "id": 161,
                    "areasArr": [
                    "伊春区",
                    "南岔区",
                    "友好区",
                    "西林区",
                    "翠峦区",
                    "新青区",
                    "美溪区",
                    "金山屯区",
                    "五营区",
                    "乌马河区",
                    "汤旺河区",
                    "带岭区",
                    "乌伊岭区",
                    "红星区",
                    "上甘岭区",
                    "嘉荫县",
                    "铁力市",
                    "市辖区"
                ],
                    "areas": {
                    "伊春区": {
                        "id": 1642
                    },
                    "南岔区": {
                        "id": 1643
                    },
                    "友好区": {
                        "id": 1644
                    },
                    "西林区": {
                        "id": 1645
                    },
                    "翠峦区": {
                        "id": 1646
                    },
                    "新青区": {
                        "id": 1647
                    },
                    "美溪区": {
                        "id": 1648
                    },
                    "金山屯区": {
                        "id": 1649
                    },
                    "五营区": {
                        "id": 1650
                    },
                    "乌马河区": {
                        "id": 1651
                    },
                    "汤旺河区": {
                        "id": 1652
                    },
                    "带岭区": {
                        "id": 1653
                    },
                    "乌伊岭区": {
                        "id": 1654
                    },
                    "红星区": {
                        "id": 1655
                    },
                    "上甘岭区": {
                        "id": 1656
                    },
                    "嘉荫县": {
                        "id": 1657
                    },
                    "铁力市": {
                        "id": 1658
                    },
                    "市辖区": {
                        "id": 3912
                    }
                }
            },
            "大庆市": {
                "id": 162,
                    "areasArr": [
                    "萨尔图区",
                    "龙凤区",
                    "让胡路区",
                    "红岗区",
                    "大同区",
                    "肇州县",
                    "肇源县",
                    "林甸县",
                    "杜尔伯特蒙古族自治县",
                    "市辖区"
                ],
                    "areas": {
                    "萨尔图区": {
                        "id": 1659
                    },
                    "龙凤区": {
                        "id": 1660
                    },
                    "让胡路区": {
                        "id": 1661
                    },
                    "红岗区": {
                        "id": 1662
                    },
                    "大同区": {
                        "id": 1663
                    },
                    "肇州县": {
                        "id": 1664
                    },
                    "肇源县": {
                        "id": 1665
                    },
                    "林甸县": {
                        "id": 1666
                    },
                    "杜尔伯特蒙古族自治县": {
                        "id": 1667
                    },
                    "市辖区": {
                        "id": 3911
                    }
                }
            }
        }
    },
    "上海市": {
        "id": 19,
            "citiesArr": [
            "上海市"
        ],
            "cities": {
            "上海市": {
                "id": 103,
                    "areasArr": [
                    "黄浦区",
                    "卢湾区",
                    "徐汇区",
                    "长宁区",
                    "静安区",
                    "普陀区",
                    "闸北区",
                    "虹口区",
                    "杨浦区",
                    "闵行区",
                    "宝山区",
                    "嘉定区",
                    "浦东新区",
                    "金山区",
                    "松江区",
                    "青浦区",
                    "南汇区",
                    "奉贤区",
                    "崇明县"
                ],
                    "areas": {
                    "黄浦区": {
                        "id": 1037
                    },
                    "卢湾区": {
                        "id": 1038
                    },
                    "徐汇区": {
                        "id": 1039
                    },
                    "长宁区": {
                        "id": 1040
                    },
                    "静安区": {
                        "id": 1041
                    },
                    "普陀区": {
                        "id": 1042
                    },
                    "闸北区": {
                        "id": 1043
                    },
                    "虹口区": {
                        "id": 1044
                    },
                    "杨浦区": {
                        "id": 1045
                    },
                    "闵行区": {
                        "id": 1046
                    },
                    "宝山区": {
                        "id": 1047
                    },
                    "嘉定区": {
                        "id": 1048
                    },
                    "浦东新区": {
                        "id": 1049
                    },
                    "金山区": {
                        "id": 1050
                    },
                    "松江区": {
                        "id": 1051
                    },
                    "青浦区": {
                        "id": 1052
                    },
                    "南汇区": {
                        "id": 1053
                    },
                    "奉贤区": {
                        "id": 1054
                    },
                    "崇明县": {
                        "id": 1055
                    }
                }
            }
        }
    },
    "江苏省": {
        "id": 20,
            "citiesArr": [
            "南京市",
            "无锡市",
            "镇江市",
            "苏州市",
            "南通市",
            "扬州市",
            "盐城市",
            "徐州市",
            "淮安市",
            "连云港市",
            "常州市",
            "泰州市",
            "宿迁市"
        ],
            "cities": {
            "南京市": {
                "id": 163,
                    "areasArr": [
                    "江宁区",
                    "浦口区",
                    "玄武区",
                    "白下区",
                    "秦淮区",
                    "建邺区",
                    "鼓楼区",
                    "下关区",
                    "栖霞区",
                    "雨花台区",
                    "六合区",
                    "溧水县",
                    "高淳县",
                    "市辖区"
                ],
                    "areas": {
                    "江宁区": {
                        "id": 1668
                    },
                    "浦口区": {
                        "id": 1669
                    },
                    "玄武区": {
                        "id": 1670
                    },
                    "白下区": {
                        "id": 1671
                    },
                    "秦淮区": {
                        "id": 1672
                    },
                    "建邺区": {
                        "id": 1673
                    },
                    "鼓楼区": {
                        "id": 1674
                    },
                    "下关区": {
                        "id": 1675
                    },
                    "栖霞区": {
                        "id": 1676
                    },
                    "雨花台区": {
                        "id": 1677
                    },
                    "六合区": {
                        "id": 1678
                    },
                    "溧水县": {
                        "id": 1679
                    },
                    "高淳县": {
                        "id": 1680
                    },
                    "市辖区": {
                        "id": 3918
                    }
                }
            },
            "无锡市": {
                "id": 164,
                    "areasArr": [
                    "崇安区",
                    "南长区",
                    "北塘区",
                    "锡山区",
                    "惠山区",
                    "滨湖区",
                    "江阴市",
                    "宜兴市",
                    "市辖区"
                ],
                    "areas": {
                    "崇安区": {
                        "id": 1681
                    },
                    "南长区": {
                        "id": 1682
                    },
                    "北塘区": {
                        "id": 1683
                    },
                    "锡山区": {
                        "id": 1684
                    },
                    "惠山区": {
                        "id": 1685
                    },
                    "滨湖区": {
                        "id": 1686
                    },
                    "江阴市": {
                        "id": 1687
                    },
                    "宜兴市": {
                        "id": 1688
                    },
                    "市辖区": {
                        "id": 3919
                    }
                }
            },
            "镇江市": {
                "id": 165,
                    "areasArr": [
                    "京口区",
                    "润州区",
                    "丹徒区",
                    "丹阳市",
                    "扬中市",
                    "句容市",
                    "市辖区"
                ],
                    "areas": {
                    "京口区": {
                        "id": 1689
                    },
                    "润州区": {
                        "id": 1690
                    },
                    "丹徒区": {
                        "id": 1691
                    },
                    "丹阳市": {
                        "id": 1692
                    },
                    "扬中市": {
                        "id": 1693
                    },
                    "句容市": {
                        "id": 1694
                    },
                    "市辖区": {
                        "id": 3928
                    }
                }
            },
            "苏州市": {
                "id": 166,
                    "areasArr": [
                    "沧浪区",
                    "常熟市",
                    "平江区",
                    "金阊区",
                    "虎丘区",
                    "昆山市",
                    "太仓市",
                    "吴江市",
                    "吴中区",
                    "相城区",
                    "张家港市",
                    "市辖区"
                ],
                    "areas": {
                    "沧浪区": {
                        "id": 1695
                    },
                    "常熟市": {
                        "id": 1696
                    },
                    "平江区": {
                        "id": 1697
                    },
                    "金阊区": {
                        "id": 1698
                    },
                    "虎丘区": {
                        "id": 1699
                    },
                    "昆山市": {
                        "id": 1700
                    },
                    "太仓市": {
                        "id": 1701
                    },
                    "吴江市": {
                        "id": 1702
                    },
                    "吴中区": {
                        "id": 1703
                    },
                    "相城区": {
                        "id": 1704
                    },
                    "张家港市": {
                        "id": 1705
                    },
                    "市辖区": {
                        "id": 3922
                    }
                }
            },
            "南通市": {
                "id": 167,
                    "areasArr": [
                    "崇川区",
                    "港闸区",
                    "海安县",
                    "如东县",
                    "启东市",
                    "如皋市",
                    "通州市",
                    "海门市",
                    "市辖区"
                ],
                    "areas": {
                    "崇川区": {
                        "id": 1706
                    },
                    "港闸区": {
                        "id": 1707
                    },
                    "海安县": {
                        "id": 1708
                    },
                    "如东县": {
                        "id": 1709
                    },
                    "启东市": {
                        "id": 1710
                    },
                    "如皋市": {
                        "id": 1711
                    },
                    "通州市": {
                        "id": 1712
                    },
                    "海门市": {
                        "id": 1713
                    },
                    "市辖区": {
                        "id": 3923
                    }
                }
            },
            "扬州市": {
                "id": 168,
                    "areasArr": [
                    "高邮市",
                    "广陵区",
                    "邗江区",
                    "维扬区",
                    "宝应县",
                    "江都市",
                    "仪征市",
                    "市辖区"
                ],
                    "areas": {
                    "高邮市": {
                        "id": 1714
                    },
                    "广陵区": {
                        "id": 1715
                    },
                    "邗江区": {
                        "id": 1716
                    },
                    "维扬区": {
                        "id": 1717
                    },
                    "宝应县": {
                        "id": 1718
                    },
                    "江都市": {
                        "id": 1719
                    },
                    "仪征市": {
                        "id": 1720
                    },
                    "市辖区": {
                        "id": 3927
                    }
                }
            },
            "盐城市": {
                "id": 169,
                    "areasArr": [
                    "亭湖区",
                    "盐都区",
                    "响水县",
                    "滨海县",
                    "阜宁县",
                    "射阳县",
                    "建湖县",
                    "东台市",
                    "大丰市",
                    "市辖区"
                ],
                    "areas": {
                    "亭湖区": {
                        "id": 1721
                    },
                    "盐都区": {
                        "id": 1722
                    },
                    "响水县": {
                        "id": 1723
                    },
                    "滨海县": {
                        "id": 1724
                    },
                    "阜宁县": {
                        "id": 1725
                    },
                    "射阳县": {
                        "id": 1726
                    },
                    "建湖县": {
                        "id": 1727
                    },
                    "东台市": {
                        "id": 1728
                    },
                    "大丰市": {
                        "id": 1729
                    },
                    "市辖区": {
                        "id": 3926
                    }
                }
            },
            "徐州市": {
                "id": 170,
                    "areasArr": [
                    "鼓楼区",
                    "云龙区",
                    "九里区",
                    "贾汪区",
                    "泉山区",
                    "丰县",
                    "沛县",
                    "铜山县",
                    "睢宁县",
                    "新沂市",
                    "邳州市",
                    "市辖区"
                ],
                    "areas": {
                    "鼓楼区": {
                        "id": 1730
                    },
                    "云龙区": {
                        "id": 1731
                    },
                    "九里区": {
                        "id": 1732
                    },
                    "贾汪区": {
                        "id": 1733
                    },
                    "泉山区": {
                        "id": 1734
                    },
                    "丰县": {
                        "id": 1735
                    },
                    "沛县": {
                        "id": 1736
                    },
                    "铜山县": {
                        "id": 1737
                    },
                    "睢宁县": {
                        "id": 1738
                    },
                    "新沂市": {
                        "id": 1739
                    },
                    "邳州市": {
                        "id": 1740
                    },
                    "市辖区": {
                        "id": 3920
                    }
                }
            },
            "淮安市": {
                "id": 171,
                    "areasArr": [
                    "清河区",
                    "楚州区",
                    "淮阴区",
                    "清浦区",
                    "涟水县",
                    "洪泽县",
                    "盱眙县",
                    "金湖县",
                    "市辖区"
                ],
                    "areas": {
                    "清河区": {
                        "id": 1741
                    },
                    "楚州区": {
                        "id": 1742
                    },
                    "淮阴区": {
                        "id": 1743
                    },
                    "清浦区": {
                        "id": 1744
                    },
                    "涟水县": {
                        "id": 1745
                    },
                    "洪泽县": {
                        "id": 1746
                    },
                    "盱眙县": {
                        "id": 1747
                    },
                    "金湖县": {
                        "id": 1748
                    },
                    "市辖区": {
                        "id": 3925
                    }
                }
            },
            "连云港市": {
                "id": 172,
                    "areasArr": [
                    "连云区",
                    "新浦区",
                    "海州区",
                    "赣榆县",
                    "东海县",
                    "灌云县",
                    "灌南县",
                    "市辖区"
                ],
                    "areas": {
                    "连云区": {
                        "id": 1749
                    },
                    "新浦区": {
                        "id": 1750
                    },
                    "海州区": {
                        "id": 1751
                    },
                    "赣榆县": {
                        "id": 1752
                    },
                    "东海县": {
                        "id": 1753
                    },
                    "灌云县": {
                        "id": 1754
                    },
                    "灌南县": {
                        "id": 1755
                    },
                    "市辖区": {
                        "id": 3924
                    }
                }
            },
            "常州市": {
                "id": 173,
                    "areasArr": [
                    "天宁区",
                    "钟楼区",
                    "戚墅堰区",
                    "新北区",
                    "武进区",
                    "溧阳市",
                    "金坛市",
                    "市辖区"
                ],
                    "areas": {
                    "天宁区": {
                        "id": 1756
                    },
                    "钟楼区": {
                        "id": 1757
                    },
                    "戚墅堰区": {
                        "id": 1758
                    },
                    "新北区": {
                        "id": 1759
                    },
                    "武进区": {
                        "id": 1760
                    },
                    "溧阳市": {
                        "id": 1761
                    },
                    "金坛市": {
                        "id": 1762
                    },
                    "市辖区": {
                        "id": 3921
                    }
                }
            },
            "泰州市": {
                "id": 174,
                    "areasArr": [
                    "海陵区",
                    "高港区",
                    "兴化市",
                    "靖江市",
                    "泰兴市",
                    "姜堰市",
                    "市辖区"
                ],
                    "areas": {
                    "海陵区": {
                        "id": 1763
                    },
                    "高港区": {
                        "id": 1764
                    },
                    "兴化市": {
                        "id": 1765
                    },
                    "靖江市": {
                        "id": 1766
                    },
                    "泰兴市": {
                        "id": 1767
                    },
                    "姜堰市": {
                        "id": 1768
                    },
                    "市辖区": {
                        "id": 3929
                    }
                }
            },
            "宿迁市": {
                "id": 175,
                    "areasArr": [
                    "宿城区",
                    "宿豫区",
                    "沭阳县",
                    "泗阳县",
                    "泗洪县",
                    "市辖区"
                ],
                    "areas": {
                    "宿城区": {
                        "id": 1769
                    },
                    "宿豫区": {
                        "id": 1770
                    },
                    "沭阳县": {
                        "id": 1771
                    },
                    "泗阳县": {
                        "id": 1772
                    },
                    "泗洪县": {
                        "id": 1773
                    },
                    "市辖区": {
                        "id": 3930
                    }
                }
            }
        }
    },
    "浙江省": {
        "id": 21,
            "citiesArr": [
            "舟山市",
            "衢州市",
            "杭州市",
            "湖州市",
            "嘉兴市",
            "宁波市",
            "绍兴市",
            "温州市",
            "丽水市",
            "金华市",
            "台州市"
        ],
            "cities": {
            "舟山市": {
                "id": 176,
                    "areasArr": [
                    "定海区",
                    "普陀区",
                    "岱山县",
                    "嵊泗县",
                    "市辖区"
                ],
                    "areas": {
                    "定海区": {
                        "id": 1774
                    },
                    "普陀区": {
                        "id": 1775
                    },
                    "岱山县": {
                        "id": 1776
                    },
                    "嵊泗县": {
                        "id": 1777
                    },
                    "市辖区": {
                        "id": 3939
                    }
                }
            },
            "衢州市": {
                "id": 177,
                    "areasArr": [
                    "柯城区",
                    "衢江区",
                    "常山县",
                    "开化县",
                    "龙游县",
                    "江山市",
                    "市辖区"
                ],
                    "areas": {
                    "柯城区": {
                        "id": 1778
                    },
                    "衢江区": {
                        "id": 1779
                    },
                    "常山县": {
                        "id": 1780
                    },
                    "开化县": {
                        "id": 1781
                    },
                    "龙游县": {
                        "id": 1782
                    },
                    "江山市": {
                        "id": 1783
                    },
                    "市辖区": {
                        "id": 3938
                    }
                }
            },
            "杭州市": {
                "id": 178,
                    "areasArr": [
                    "上城区",
                    "下城区",
                    "江干区",
                    "拱墅区",
                    "西湖区",
                    "滨江区",
                    "余杭区",
                    "桐庐县",
                    "淳安县",
                    "建德市",
                    "富阳市",
                    "临安市",
                    "萧山区",
                    "市辖区"
                ],
                    "areas": {
                    "上城区": {
                        "id": 1784
                    },
                    "下城区": {
                        "id": 1785
                    },
                    "江干区": {
                        "id": 1786
                    },
                    "拱墅区": {
                        "id": 1787
                    },
                    "西湖区": {
                        "id": 1788
                    },
                    "滨江区": {
                        "id": 1789
                    },
                    "余杭区": {
                        "id": 1790
                    },
                    "桐庐县": {
                        "id": 1791
                    },
                    "淳安县": {
                        "id": 1792
                    },
                    "建德市": {
                        "id": 1793
                    },
                    "富阳市": {
                        "id": 1794
                    },
                    "临安市": {
                        "id": 1795
                    },
                    "萧山区": {
                        "id": 1796
                    },
                    "市辖区": {
                        "id": 3931
                    }
                }
            },
            "湖州市": {
                "id": 179,
                    "areasArr": [
                    "吴兴区",
                    "南浔区",
                    "德清县",
                    "长兴县",
                    "安吉县",
                    "市辖区"
                ],
                    "areas": {
                    "吴兴区": {
                        "id": 1797
                    },
                    "南浔区": {
                        "id": 1798
                    },
                    "德清县": {
                        "id": 1799
                    },
                    "长兴县": {
                        "id": 1800
                    },
                    "安吉县": {
                        "id": 1801
                    },
                    "市辖区": {
                        "id": 3935
                    }
                }
            },
            "嘉兴市": {
                "id": 180,
                    "areasArr": [
                    "南湖区",
                    "秀洲区",
                    "嘉善县",
                    "海盐县",
                    "海宁市",
                    "平湖市",
                    "桐乡市",
                    "市辖区"
                ],
                    "areas": {
                    "南湖区": {
                        "id": 1802
                    },
                    "秀洲区": {
                        "id": 1803
                    },
                    "嘉善县": {
                        "id": 1804
                    },
                    "海盐县": {
                        "id": 1805
                    },
                    "海宁市": {
                        "id": 1806
                    },
                    "平湖市": {
                        "id": 1807
                    },
                    "桐乡市": {
                        "id": 1808
                    },
                    "市辖区": {
                        "id": 3934
                    }
                }
            },
            "宁波市": {
                "id": 181,
                    "areasArr": [
                    "海曙区",
                    "江东区",
                    "江北区",
                    "北仑区",
                    "镇海区",
                    "鄞州区",
                    "象山县",
                    "宁海县",
                    "余姚市",
                    "慈溪市",
                    "奉化市",
                    "市辖区"
                ],
                    "areas": {
                    "海曙区": {
                        "id": 1809
                    },
                    "江东区": {
                        "id": 1810
                    },
                    "江北区": {
                        "id": 1811
                    },
                    "北仑区": {
                        "id": 1812
                    },
                    "镇海区": {
                        "id": 1813
                    },
                    "鄞州区": {
                        "id": 1814
                    },
                    "象山县": {
                        "id": 1815
                    },
                    "宁海县": {
                        "id": 1816
                    },
                    "余姚市": {
                        "id": 1817
                    },
                    "慈溪市": {
                        "id": 1818
                    },
                    "奉化市": {
                        "id": 1819
                    },
                    "市辖区": {
                        "id": 3932
                    }
                }
            },
            "绍兴市": {
                "id": 182,
                    "areasArr": [
                    "越城区",
                    "绍兴县",
                    "新昌县",
                    "诸暨市",
                    "上虞市",
                    "嵊州市",
                    "市辖区"
                ],
                    "areas": {
                    "越城区": {
                        "id": 1820
                    },
                    "绍兴县": {
                        "id": 1821
                    },
                    "新昌县": {
                        "id": 1822
                    },
                    "诸暨市": {
                        "id": 1823
                    },
                    "上虞市": {
                        "id": 1824
                    },
                    "嵊州市": {
                        "id": 1825
                    },
                    "市辖区": {
                        "id": 3936
                    }
                }
            },
            "温州市": {
                "id": 183,
                    "areasArr": [
                    "鹿城区",
                    "龙湾区",
                    "瓯海区",
                    "洞头县",
                    "永嘉县",
                    "平阳县",
                    "苍南县",
                    "文成县",
                    "泰顺县",
                    "瑞安市",
                    "乐清市",
                    "市辖区"
                ],
                    "areas": {
                    "鹿城区": {
                        "id": 1826
                    },
                    "龙湾区": {
                        "id": 1827
                    },
                    "瓯海区": {
                        "id": 1828
                    },
                    "洞头县": {
                        "id": 1829
                    },
                    "永嘉县": {
                        "id": 1830
                    },
                    "平阳县": {
                        "id": 1831
                    },
                    "苍南县": {
                        "id": 1832
                    },
                    "文成县": {
                        "id": 1833
                    },
                    "泰顺县": {
                        "id": 1834
                    },
                    "瑞安市": {
                        "id": 1835
                    },
                    "乐清市": {
                        "id": 1836
                    },
                    "市辖区": {
                        "id": 3933
                    }
                }
            },
            "丽水市": {
                "id": 184,
                    "areasArr": [
                    "莲都区",
                    "青田县",
                    "缙云县",
                    "遂昌县",
                    "松阳县",
                    "云和县",
                    "庆元县",
                    "景宁畲族自治县",
                    "龙泉市",
                    "市辖区"
                ],
                    "areas": {
                    "莲都区": {
                        "id": 1837
                    },
                    "青田县": {
                        "id": 1838
                    },
                    "缙云县": {
                        "id": 1839
                    },
                    "遂昌县": {
                        "id": 1840
                    },
                    "松阳县": {
                        "id": 1841
                    },
                    "云和县": {
                        "id": 1842
                    },
                    "庆元县": {
                        "id": 1843
                    },
                    "景宁畲族自治县": {
                        "id": 1844
                    },
                    "龙泉市": {
                        "id": 1845
                    },
                    "市辖区": {
                        "id": 3941
                    }
                }
            },
            "金华市": {
                "id": 185,
                    "areasArr": [
                    "婺城区",
                    "金东区",
                    "武义县",
                    "浦江县",
                    "磐安县",
                    "兰溪市",
                    "义乌市",
                    "东阳市",
                    "永康市",
                    "市辖区"
                ],
                    "areas": {
                    "婺城区": {
                        "id": 1846
                    },
                    "金东区": {
                        "id": 1847
                    },
                    "武义县": {
                        "id": 1848
                    },
                    "浦江县": {
                        "id": 1849
                    },
                    "磐安县": {
                        "id": 1850
                    },
                    "兰溪市": {
                        "id": 1851
                    },
                    "义乌市": {
                        "id": 1852
                    },
                    "东阳市": {
                        "id": 1853
                    },
                    "永康市": {
                        "id": 1854
                    },
                    "市辖区": {
                        "id": 3937
                    }
                }
            },
            "台州市": {
                "id": 186,
                    "areasArr": [
                    "椒江区",
                    "黄岩区",
                    "路桥区",
                    "玉环县",
                    "三门县",
                    "天台县",
                    "仙居县",
                    "温岭市",
                    "临海市",
                    "市辖区"
                ],
                    "areas": {
                    "椒江区": {
                        "id": 1855
                    },
                    "黄岩区": {
                        "id": 1856
                    },
                    "路桥区": {
                        "id": 1857
                    },
                    "玉环县": {
                        "id": 1858
                    },
                    "三门县": {
                        "id": 1859
                    },
                    "天台县": {
                        "id": 1860
                    },
                    "仙居县": {
                        "id": 1861
                    },
                    "温岭市": {
                        "id": 1862
                    },
                    "临海市": {
                        "id": 1863
                    },
                    "市辖区": {
                        "id": 3940
                    }
                }
            }
        }
    },
    "安徽省": {
        "id": 22,
            "citiesArr": [
            "合肥市",
            "芜湖市",
            "蚌埠市",
            "淮南市",
            "马鞍山市",
            "淮北市",
            "铜陵市",
            "安庆市",
            "黄山市",
            "滁州市",
            "阜阳市",
            "宿州市",
            "巢湖市",
            "六安市",
            "亳州市",
            "池州市",
            "宣城市"
        ],
            "cities": {
            "合肥市": {
                "id": 187,
                    "areasArr": [
                    "瑶海区",
                    "庐阳区",
                    "蜀山区",
                    "包河区",
                    "长丰县",
                    "肥东县",
                    "肥西县",
                    "市辖区"
                ],
                    "areas": {
                    "瑶海区": {
                        "id": 1864
                    },
                    "庐阳区": {
                        "id": 1865
                    },
                    "蜀山区": {
                        "id": 1866
                    },
                    "包河区": {
                        "id": 1867
                    },
                    "长丰县": {
                        "id": 1868
                    },
                    "肥东县": {
                        "id": 1869
                    },
                    "肥西县": {
                        "id": 1870
                    },
                    "市辖区": {
                        "id": 3942
                    }
                }
            },
            "芜湖市": {
                "id": 188,
                    "areasArr": [
                    "镜湖区",
                    "弋江区",
                    "鸠江区",
                    "三山区",
                    "芜湖县",
                    "繁昌县",
                    "南陵县",
                    "市辖区"
                ],
                    "areas": {
                    "镜湖区": {
                        "id": 1871
                    },
                    "弋江区": {
                        "id": 1872
                    },
                    "鸠江区": {
                        "id": 1873
                    },
                    "三山区": {
                        "id": 1874
                    },
                    "芜湖县": {
                        "id": 1875
                    },
                    "繁昌县": {
                        "id": 1876
                    },
                    "南陵县": {
                        "id": 1877
                    },
                    "市辖区": {
                        "id": 3943
                    }
                }
            },
            "蚌埠市": {
                "id": 189,
                    "areasArr": [
                    "龙子湖区",
                    "蚌山区",
                    "禹会区",
                    "淮上区",
                    "怀远县",
                    "五河县",
                    "固镇县",
                    "市辖区"
                ],
                    "areas": {
                    "龙子湖区": {
                        "id": 1878
                    },
                    "蚌山区": {
                        "id": 1879
                    },
                    "禹会区": {
                        "id": 1880
                    },
                    "淮上区": {
                        "id": 1881
                    },
                    "怀远县": {
                        "id": 1882
                    },
                    "五河县": {
                        "id": 1883
                    },
                    "固镇县": {
                        "id": 1884
                    },
                    "市辖区": {
                        "id": 3944
                    }
                }
            },
            "淮南市": {
                "id": 190,
                    "areasArr": [
                    "大通区",
                    "田家庵区",
                    "谢家集区",
                    "八公山区",
                    "潘集区",
                    "凤台县",
                    "市辖区"
                ],
                    "areas": {
                    "大通区": {
                        "id": 1885
                    },
                    "田家庵区": {
                        "id": 1886
                    },
                    "谢家集区": {
                        "id": 1887
                    },
                    "八公山区": {
                        "id": 1888
                    },
                    "潘集区": {
                        "id": 1889
                    },
                    "凤台县": {
                        "id": 1890
                    },
                    "市辖区": {
                        "id": 3945
                    }
                }
            },
            "马鞍山市": {
                "id": 191,
                    "areasArr": [
                    "金家庄区",
                    "花山区",
                    "雨山区",
                    "当涂县",
                    "市辖区"
                ],
                    "areas": {
                    "金家庄区": {
                        "id": 1891
                    },
                    "花山区": {
                        "id": 1892
                    },
                    "雨山区": {
                        "id": 1893
                    },
                    "当涂县": {
                        "id": 1894
                    },
                    "市辖区": {
                        "id": 3946
                    }
                }
            },
            "淮北市": {
                "id": 192,
                    "areasArr": [
                    "杜集区",
                    "相山区",
                    "烈山区",
                    "濉溪县",
                    "市辖区"
                ],
                    "areas": {
                    "杜集区": {
                        "id": 1895
                    },
                    "相山区": {
                        "id": 1896
                    },
                    "烈山区": {
                        "id": 1897
                    },
                    "濉溪县": {
                        "id": 1898
                    },
                    "市辖区": {
                        "id": 3947
                    }
                }
            },
            "铜陵市": {
                "id": 193,
                    "areasArr": [
                    "铜官山区",
                    "狮子山区",
                    "铜陵县",
                    "市辖区",
                    "郊区"
                ],
                    "areas": {
                    "铜官山区": {
                        "id": 1899
                    },
                    "狮子山区": {
                        "id": 1900
                    },
                    "铜陵县": {
                        "id": 1901
                    },
                    "市辖区": {
                        "id": 3948
                    },
                    "郊区": {
                        "id": 4144
                    }
                }
            },
            "安庆市": {
                "id": 194,
                    "areasArr": [
                    "迎江区",
                    "大观区",
                    "宜秀区",
                    "怀宁县",
                    "枞阳县",
                    "潜山县",
                    "太湖县",
                    "宿松县",
                    "望江县",
                    "岳西县",
                    "桐城市",
                    "市辖区"
                ],
                    "areas": {
                    "迎江区": {
                        "id": 1902
                    },
                    "大观区": {
                        "id": 1903
                    },
                    "宜秀区": {
                        "id": 1904
                    },
                    "怀宁县": {
                        "id": 1905
                    },
                    "枞阳县": {
                        "id": 1906
                    },
                    "潜山县": {
                        "id": 1907
                    },
                    "太湖县": {
                        "id": 1908
                    },
                    "宿松县": {
                        "id": 1909
                    },
                    "望江县": {
                        "id": 1910
                    },
                    "岳西县": {
                        "id": 1911
                    },
                    "桐城市": {
                        "id": 1912
                    },
                    "市辖区": {
                        "id": 3949
                    }
                }
            },
            "黄山市": {
                "id": 195,
                    "areasArr": [
                    "屯溪区",
                    "黄山区",
                    "徽州区",
                    "歙县",
                    "休宁县",
                    "黟县",
                    "祁门县",
                    "市辖区"
                ],
                    "areas": {
                    "屯溪区": {
                        "id": 1913
                    },
                    "黄山区": {
                        "id": 1914
                    },
                    "徽州区": {
                        "id": 1915
                    },
                    "歙县": {
                        "id": 1916
                    },
                    "休宁县": {
                        "id": 1917
                    },
                    "黟县": {
                        "id": 1918
                    },
                    "祁门县": {
                        "id": 1919
                    },
                    "市辖区": {
                        "id": 3950
                    }
                }
            },
            "滁州市": {
                "id": 196,
                    "areasArr": [
                    "琅琊区",
                    "南谯区",
                    "来安县",
                    "全椒县",
                    "定远县",
                    "凤阳县",
                    "天长市",
                    "明光市",
                    "市辖区"
                ],
                    "areas": {
                    "琅琊区": {
                        "id": 1920
                    },
                    "南谯区": {
                        "id": 1921
                    },
                    "来安县": {
                        "id": 1922
                    },
                    "全椒县": {
                        "id": 1923
                    },
                    "定远县": {
                        "id": 1924
                    },
                    "凤阳县": {
                        "id": 1925
                    },
                    "天长市": {
                        "id": 1926
                    },
                    "明光市": {
                        "id": 1927
                    },
                    "市辖区": {
                        "id": 3951
                    }
                }
            },
            "阜阳市": {
                "id": 197,
                    "areasArr": [
                    "颍州区",
                    "颍东区",
                    "颍泉区",
                    "临泉县",
                    "太和县",
                    "阜南县",
                    "颍上县",
                    "界首市",
                    "市辖区"
                ],
                    "areas": {
                    "颍州区": {
                        "id": 1928
                    },
                    "颍东区": {
                        "id": 1929
                    },
                    "颍泉区": {
                        "id": 1930
                    },
                    "临泉县": {
                        "id": 1931
                    },
                    "太和县": {
                        "id": 1932
                    },
                    "阜南县": {
                        "id": 1933
                    },
                    "颍上县": {
                        "id": 1934
                    },
                    "界首市": {
                        "id": 1935
                    },
                    "市辖区": {
                        "id": 3952
                    }
                }
            },
            "宿州市": {
                "id": 198,
                    "areasArr": [
                    "埇桥区",
                    "砀山县",
                    "萧县",
                    "灵璧县",
                    "泗县",
                    "市辖区"
                ],
                    "areas": {
                    "埇桥区": {
                        "id": 1936
                    },
                    "砀山县": {
                        "id": 1937
                    },
                    "萧县": {
                        "id": 1938
                    },
                    "灵璧县": {
                        "id": 1939
                    },
                    "泗县": {
                        "id": 1940
                    },
                    "市辖区": {
                        "id": 3953
                    }
                }
            },
            "巢湖市": {
                "id": 199,
                    "areasArr": [
                    "居巢区",
                    "庐江县",
                    "无为县",
                    "含山县",
                    "和县",
                    "市辖区"
                ],
                    "areas": {
                    "居巢区": {
                        "id": 1941
                    },
                    "庐江县": {
                        "id": 1942
                    },
                    "无为县": {
                        "id": 1943
                    },
                    "含山县": {
                        "id": 1944
                    },
                    "和县": {
                        "id": 1945
                    },
                    "市辖区": {
                        "id": 3954
                    }
                }
            },
            "六安市": {
                "id": 200,
                    "areasArr": [
                    "金安区",
                    "裕安区",
                    "寿县",
                    "霍邱县",
                    "舒城县",
                    "金寨县",
                    "霍山县",
                    "市辖区"
                ],
                    "areas": {
                    "金安区": {
                        "id": 1946
                    },
                    "裕安区": {
                        "id": 1947
                    },
                    "寿县": {
                        "id": 1948
                    },
                    "霍邱县": {
                        "id": 1949
                    },
                    "舒城县": {
                        "id": 1950
                    },
                    "金寨县": {
                        "id": 1951
                    },
                    "霍山县": {
                        "id": 1952
                    },
                    "市辖区": {
                        "id": 3955
                    }
                }
            },
            "亳州市": {
                "id": 201,
                    "areasArr": [
                    "谯城区",
                    "涡阳县",
                    "蒙城县",
                    "利辛县",
                    "市辖区"
                ],
                    "areas": {
                    "谯城区": {
                        "id": 1953
                    },
                    "涡阳县": {
                        "id": 1954
                    },
                    "蒙城县": {
                        "id": 1955
                    },
                    "利辛县": {
                        "id": 1956
                    },
                    "市辖区": {
                        "id": 3956
                    }
                }
            },
            "池州市": {
                "id": 202,
                    "areasArr": [
                    "贵池区",
                    "东至县",
                    "石台县",
                    "青阳县",
                    "市辖区"
                ],
                    "areas": {
                    "贵池区": {
                        "id": 1957
                    },
                    "东至县": {
                        "id": 1958
                    },
                    "石台县": {
                        "id": 1959
                    },
                    "青阳县": {
                        "id": 1960
                    },
                    "市辖区": {
                        "id": 3957
                    }
                }
            },
            "宣城市": {
                "id": 203,
                    "areasArr": [
                    "宣州区",
                    "郎溪县",
                    "广德县",
                    "泾县",
                    "绩溪县",
                    "旌德县",
                    "宁国市",
                    "市辖区"
                ],
                    "areas": {
                    "宣州区": {
                        "id": 1961
                    },
                    "郎溪县": {
                        "id": 1962
                    },
                    "广德县": {
                        "id": 1963
                    },
                    "泾县": {
                        "id": 1964
                    },
                    "绩溪县": {
                        "id": 1965
                    },
                    "旌德县": {
                        "id": 1966
                    },
                    "宁国市": {
                        "id": 1967
                    },
                    "市辖区": {
                        "id": 3958
                    }
                }
            }
        }
    },
    "福建省": {
        "id": 23,
            "citiesArr": [
            "福州市",
            "厦门市",
            "宁德市",
            "莆田市",
            "泉州市",
            "漳州市",
            "龙岩市",
            "三明市",
            "南平市"
        ],
            "cities": {
            "福州市": {
                "id": 204,
                    "areasArr": [
                    "鼓楼区",
                    "台江区",
                    "仓山区",
                    "马尾区",
                    "晋安区",
                    "闽侯县",
                    "连江县",
                    "罗源县",
                    "闽清县",
                    "永泰县",
                    "平潭县",
                    "福清市",
                    "长乐市",
                    "市辖区"
                ],
                    "areas": {
                    "鼓楼区": {
                        "id": 1968
                    },
                    "台江区": {
                        "id": 1969
                    },
                    "仓山区": {
                        "id": 1970
                    },
                    "马尾区": {
                        "id": 1971
                    },
                    "晋安区": {
                        "id": 1972
                    },
                    "闽侯县": {
                        "id": 1973
                    },
                    "连江县": {
                        "id": 1974
                    },
                    "罗源县": {
                        "id": 1975
                    },
                    "闽清县": {
                        "id": 1976
                    },
                    "永泰县": {
                        "id": 1977
                    },
                    "平潭县": {
                        "id": 1978
                    },
                    "福清市": {
                        "id": 1979
                    },
                    "长乐市": {
                        "id": 1980
                    },
                    "市辖区": {
                        "id": 3959
                    }
                }
            },
            "厦门市": {
                "id": 205,
                    "areasArr": [
                    "思明区",
                    "海沧区",
                    "湖里区",
                    "集美区",
                    "同安区",
                    "翔安区",
                    "市辖区"
                ],
                    "areas": {
                    "思明区": {
                        "id": 1981
                    },
                    "海沧区": {
                        "id": 1982
                    },
                    "湖里区": {
                        "id": 1983
                    },
                    "集美区": {
                        "id": 1984
                    },
                    "同安区": {
                        "id": 1985
                    },
                    "翔安区": {
                        "id": 1986
                    },
                    "市辖区": {
                        "id": 3960
                    }
                }
            },
            "宁德市": {
                "id": 206,
                    "areasArr": [
                    "蕉城区",
                    "霞浦县",
                    "古田县",
                    "屏南县",
                    "寿宁县",
                    "周宁县",
                    "柘荣县",
                    "福安市",
                    "福鼎市",
                    "市辖区"
                ],
                    "areas": {
                    "蕉城区": {
                        "id": 1987
                    },
                    "霞浦县": {
                        "id": 1988
                    },
                    "古田县": {
                        "id": 1989
                    },
                    "屏南县": {
                        "id": 1990
                    },
                    "寿宁县": {
                        "id": 1991
                    },
                    "周宁县": {
                        "id": 1992
                    },
                    "柘荣县": {
                        "id": 1993
                    },
                    "福安市": {
                        "id": 1994
                    },
                    "福鼎市": {
                        "id": 1995
                    },
                    "市辖区": {
                        "id": 3967
                    }
                }
            },
            "莆田市": {
                "id": 207,
                    "areasArr": [
                    "城厢区",
                    "涵江区",
                    "荔城区",
                    "秀屿区",
                    "仙游县",
                    "市辖区"
                ],
                    "areas": {
                    "城厢区": {
                        "id": 1996
                    },
                    "涵江区": {
                        "id": 1997
                    },
                    "荔城区": {
                        "id": 1998
                    },
                    "秀屿区": {
                        "id": 1999
                    },
                    "仙游县": {
                        "id": 2000
                    },
                    "市辖区": {
                        "id": 3961
                    }
                }
            },
            "泉州市": {
                "id": 208,
                    "areasArr": [
                    "鲤城区",
                    "丰泽区",
                    "洛江区",
                    "泉港区",
                    "惠安县",
                    "安溪县",
                    "永春县",
                    "德化县",
                    "石狮市",
                    "晋江市",
                    "南安市",
                    "市辖区",
                    "金门县"
                ],
                    "areas": {
                    "鲤城区": {
                        "id": 2001
                    },
                    "丰泽区": {
                        "id": 2002
                    },
                    "洛江区": {
                        "id": 2003
                    },
                    "泉港区": {
                        "id": 2004
                    },
                    "惠安县": {
                        "id": 2005
                    },
                    "安溪县": {
                        "id": 2006
                    },
                    "永春县": {
                        "id": 2007
                    },
                    "德化县": {
                        "id": 2008
                    },
                    "石狮市": {
                        "id": 2009
                    },
                    "晋江市": {
                        "id": 2010
                    },
                    "南安市": {
                        "id": 2011
                    },
                    "市辖区": {
                        "id": 3963
                    },
                    "金门县": {
                        "id": 4145
                    }
                }
            },
            "漳州市": {
                "id": 209,
                    "areasArr": [
                    "芗城区",
                    "龙文区",
                    "云霄县",
                    "漳浦县",
                    "诏安县",
                    "长泰县",
                    "东山县",
                    "南靖县",
                    "平和县",
                    "华安县",
                    "龙海市",
                    "市辖区"
                ],
                    "areas": {
                    "芗城区": {
                        "id": 2012
                    },
                    "龙文区": {
                        "id": 2013
                    },
                    "云霄县": {
                        "id": 2014
                    },
                    "漳浦县": {
                        "id": 2015
                    },
                    "诏安县": {
                        "id": 2016
                    },
                    "长泰县": {
                        "id": 2017
                    },
                    "东山县": {
                        "id": 2018
                    },
                    "南靖县": {
                        "id": 2019
                    },
                    "平和县": {
                        "id": 2020
                    },
                    "华安县": {
                        "id": 2021
                    },
                    "龙海市": {
                        "id": 2022
                    },
                    "市辖区": {
                        "id": 3964
                    }
                }
            },
            "龙岩市": {
                "id": 210,
                    "areasArr": [
                    "新罗区",
                    "长汀县",
                    "永定县",
                    "上杭县",
                    "武平县",
                    "连城县",
                    "漳平市",
                    "市辖区"
                ],
                    "areas": {
                    "新罗区": {
                        "id": 2023
                    },
                    "长汀县": {
                        "id": 2024
                    },
                    "永定县": {
                        "id": 2025
                    },
                    "上杭县": {
                        "id": 2026
                    },
                    "武平县": {
                        "id": 2027
                    },
                    "连城县": {
                        "id": 2028
                    },
                    "漳平市": {
                        "id": 2029
                    },
                    "市辖区": {
                        "id": 3966
                    }
                }
            },
            "三明市": {
                "id": 211,
                    "areasArr": [
                    "梅列区",
                    "三元区",
                    "明溪县",
                    "清流县",
                    "宁化县",
                    "大田县",
                    "尤溪县",
                    "沙县",
                    "将乐县",
                    "泰宁县",
                    "建宁县",
                    "永安市",
                    "市辖区"
                ],
                    "areas": {
                    "梅列区": {
                        "id": 2030
                    },
                    "三元区": {
                        "id": 2031
                    },
                    "明溪县": {
                        "id": 2032
                    },
                    "清流县": {
                        "id": 2033
                    },
                    "宁化县": {
                        "id": 2034
                    },
                    "大田县": {
                        "id": 2035
                    },
                    "尤溪县": {
                        "id": 2036
                    },
                    "沙县": {
                        "id": 2037
                    },
                    "将乐县": {
                        "id": 2038
                    },
                    "泰宁县": {
                        "id": 2039
                    },
                    "建宁县": {
                        "id": 2040
                    },
                    "永安市": {
                        "id": 2041
                    },
                    "市辖区": {
                        "id": 3962
                    }
                }
            },
            "南平市": {
                "id": 212,
                    "areasArr": [
                    "延平区",
                    "顺昌县",
                    "浦城县",
                    "光泽县",
                    "松溪县",
                    "政和县",
                    "邵武市",
                    "武夷山市",
                    "建瓯市",
                    "建阳市",
                    "市辖区"
                ],
                    "areas": {
                    "延平区": {
                        "id": 2042
                    },
                    "顺昌县": {
                        "id": 2043
                    },
                    "浦城县": {
                        "id": 2044
                    },
                    "光泽县": {
                        "id": 2045
                    },
                    "松溪县": {
                        "id": 2046
                    },
                    "政和县": {
                        "id": 2047
                    },
                    "邵武市": {
                        "id": 2048
                    },
                    "武夷山市": {
                        "id": 2049
                    },
                    "建瓯市": {
                        "id": 2050
                    },
                    "建阳市": {
                        "id": 2051
                    },
                    "市辖区": {
                        "id": 3965
                    }
                }
            }
        }
    },
    "江西省": {
        "id": 24,
            "citiesArr": [
            "鹰潭市",
            "新余市",
            "南昌市",
            "九江市",
            "上饶市",
            "抚州市",
            "宜春市",
            "吉安市",
            "赣州市",
            "景德镇市",
            "萍乡市"
        ],
            "cities": {
            "鹰潭市": {
                "id": 213,
                    "areasArr": [
                    "月湖区",
                    "余江县",
                    "贵溪市",
                    "市辖区"
                ],
                    "areas": {
                    "月湖区": {
                        "id": 2052
                    },
                    "余江县": {
                        "id": 2053
                    },
                    "贵溪市": {
                        "id": 2054
                    },
                    "市辖区": {
                        "id": 3973
                    }
                }
            },
            "新余市": {
                "id": 214,
                    "areasArr": [
                    "渝水区",
                    "分宜县",
                    "市辖区"
                ],
                    "areas": {
                    "渝水区": {
                        "id": 2055
                    },
                    "分宜县": {
                        "id": 2056
                    },
                    "市辖区": {
                        "id": 3972
                    }
                }
            },
            "南昌市": {
                "id": 215,
                    "areasArr": [
                    "东湖区",
                    "西湖区",
                    "青云谱区",
                    "湾里区",
                    "青山湖区",
                    "南昌县",
                    "新建县",
                    "安义县",
                    "进贤县",
                    "市辖区"
                ],
                    "areas": {
                    "东湖区": {
                        "id": 2057
                    },
                    "西湖区": {
                        "id": 2058
                    },
                    "青云谱区": {
                        "id": 2059
                    },
                    "湾里区": {
                        "id": 2060
                    },
                    "青山湖区": {
                        "id": 2061
                    },
                    "南昌县": {
                        "id": 2062
                    },
                    "新建县": {
                        "id": 2063
                    },
                    "安义县": {
                        "id": 2064
                    },
                    "进贤县": {
                        "id": 2065
                    },
                    "市辖区": {
                        "id": 3968
                    }
                }
            },
            "九江市": {
                "id": 216,
                    "areasArr": [
                    "庐山区",
                    "浔阳区",
                    "九江县",
                    "武宁县",
                    "修水县",
                    "永修县",
                    "德安县",
                    "星子县",
                    "都昌县",
                    "湖口县",
                    "彭泽县",
                    "瑞昌市",
                    "市辖区"
                ],
                    "areas": {
                    "庐山区": {
                        "id": 2066
                    },
                    "浔阳区": {
                        "id": 2067
                    },
                    "九江县": {
                        "id": 2068
                    },
                    "武宁县": {
                        "id": 2069
                    },
                    "修水县": {
                        "id": 2070
                    },
                    "永修县": {
                        "id": 2071
                    },
                    "德安县": {
                        "id": 2072
                    },
                    "星子县": {
                        "id": 2073
                    },
                    "都昌县": {
                        "id": 2074
                    },
                    "湖口县": {
                        "id": 2075
                    },
                    "彭泽县": {
                        "id": 2076
                    },
                    "瑞昌市": {
                        "id": 2077
                    },
                    "市辖区": {
                        "id": 3971
                    }
                }
            },
            "上饶市": {
                "id": 217,
                    "areasArr": [
                    "信州区",
                    "上饶县",
                    "广丰县",
                    "玉山县",
                    "铅山县",
                    "横峰县",
                    "弋阳县",
                    "余干县",
                    "鄱阳县",
                    "万年县",
                    "婺源县",
                    "德兴市",
                    "市辖区"
                ],
                    "areas": {
                    "信州区": {
                        "id": 2078
                    },
                    "上饶县": {
                        "id": 2079
                    },
                    "广丰县": {
                        "id": 2080
                    },
                    "玉山县": {
                        "id": 2081
                    },
                    "铅山县": {
                        "id": 2082
                    },
                    "横峰县": {
                        "id": 2083
                    },
                    "弋阳县": {
                        "id": 2084
                    },
                    "余干县": {
                        "id": 2085
                    },
                    "鄱阳县": {
                        "id": 2086
                    },
                    "万年县": {
                        "id": 2087
                    },
                    "婺源县": {
                        "id": 2088
                    },
                    "德兴市": {
                        "id": 2089
                    },
                    "市辖区": {
                        "id": 3978
                    }
                }
            },
            "抚州市": {
                "id": 218,
                    "areasArr": [
                    "临川区",
                    "南城县",
                    "黎川县",
                    "南丰县",
                    "崇仁县",
                    "乐安县",
                    "宜黄县",
                    "金溪县",
                    "资溪县",
                    "东乡县",
                    "广昌县",
                    "市辖区"
                ],
                    "areas": {
                    "临川区": {
                        "id": 2090
                    },
                    "南城县": {
                        "id": 2091
                    },
                    "黎川县": {
                        "id": 2092
                    },
                    "南丰县": {
                        "id": 2093
                    },
                    "崇仁县": {
                        "id": 2094
                    },
                    "乐安县": {
                        "id": 2095
                    },
                    "宜黄县": {
                        "id": 2096
                    },
                    "金溪县": {
                        "id": 2097
                    },
                    "资溪县": {
                        "id": 2098
                    },
                    "东乡县": {
                        "id": 2099
                    },
                    "广昌县": {
                        "id": 2100
                    },
                    "市辖区": {
                        "id": 3977
                    }
                }
            },
            "宜春市": {
                "id": 219,
                    "areasArr": [
                    "袁州区",
                    "奉新县",
                    "万载县",
                    "上高县",
                    "宜丰县",
                    "靖安县",
                    "铜鼓县",
                    "丰城市",
                    "樟树市",
                    "高安市",
                    "市辖区"
                ],
                    "areas": {
                    "袁州区": {
                        "id": 2101
                    },
                    "奉新县": {
                        "id": 2102
                    },
                    "万载县": {
                        "id": 2103
                    },
                    "上高县": {
                        "id": 2104
                    },
                    "宜丰县": {
                        "id": 2105
                    },
                    "靖安县": {
                        "id": 2106
                    },
                    "铜鼓县": {
                        "id": 2107
                    },
                    "丰城市": {
                        "id": 2108
                    },
                    "樟树市": {
                        "id": 2109
                    },
                    "高安市": {
                        "id": 2110
                    },
                    "市辖区": {
                        "id": 3976
                    }
                }
            },
            "吉安市": {
                "id": 220,
                    "areasArr": [
                    "吉州区",
                    "青原区",
                    "吉安县",
                    "吉水县",
                    "峡江县",
                    "新干县",
                    "永丰县",
                    "泰和县",
                    "遂川县",
                    "万安县",
                    "安福县",
                    "永新县",
                    "井冈山市",
                    "市辖区"
                ],
                    "areas": {
                    "吉州区": {
                        "id": 2111
                    },
                    "青原区": {
                        "id": 2112
                    },
                    "吉安县": {
                        "id": 2113
                    },
                    "吉水县": {
                        "id": 2114
                    },
                    "峡江县": {
                        "id": 2115
                    },
                    "新干县": {
                        "id": 2116
                    },
                    "永丰县": {
                        "id": 2117
                    },
                    "泰和县": {
                        "id": 2118
                    },
                    "遂川县": {
                        "id": 2119
                    },
                    "万安县": {
                        "id": 2120
                    },
                    "安福县": {
                        "id": 2121
                    },
                    "永新县": {
                        "id": 2122
                    },
                    "井冈山市": {
                        "id": 2123
                    },
                    "市辖区": {
                        "id": 3975
                    }
                }
            },
            "赣州市": {
                "id": 221,
                    "areasArr": [
                    "章贡区",
                    "赣县",
                    "信丰县",
                    "大余县",
                    "上犹县",
                    "崇义县",
                    "安远县",
                    "龙南县",
                    "定南县",
                    "全南县",
                    "宁都县",
                    "于都县",
                    "兴国县",
                    "会昌县",
                    "寻乌县",
                    "石城县",
                    "瑞金市",
                    "南康市",
                    "市辖区"
                ],
                    "areas": {
                    "章贡区": {
                        "id": 2124
                    },
                    "赣县": {
                        "id": 2125
                    },
                    "信丰县": {
                        "id": 2126
                    },
                    "大余县": {
                        "id": 2127
                    },
                    "上犹县": {
                        "id": 2128
                    },
                    "崇义县": {
                        "id": 2129
                    },
                    "安远县": {
                        "id": 2130
                    },
                    "龙南县": {
                        "id": 2131
                    },
                    "定南县": {
                        "id": 2132
                    },
                    "全南县": {
                        "id": 2133
                    },
                    "宁都县": {
                        "id": 2134
                    },
                    "于都县": {
                        "id": 2135
                    },
                    "兴国县": {
                        "id": 2136
                    },
                    "会昌县": {
                        "id": 2137
                    },
                    "寻乌县": {
                        "id": 2138
                    },
                    "石城县": {
                        "id": 2139
                    },
                    "瑞金市": {
                        "id": 2140
                    },
                    "南康市": {
                        "id": 2141
                    },
                    "市辖区": {
                        "id": 3974
                    }
                }
            },
            "景德镇市": {
                "id": 222,
                    "areasArr": [
                    "昌江区",
                    "珠山区",
                    "浮梁县",
                    "乐平市",
                    "市辖区"
                ],
                    "areas": {
                    "昌江区": {
                        "id": 2142
                    },
                    "珠山区": {
                        "id": 2143
                    },
                    "浮梁县": {
                        "id": 2144
                    },
                    "乐平市": {
                        "id": 2145
                    },
                    "市辖区": {
                        "id": 3969
                    }
                }
            },
            "萍乡市": {
                "id": 223,
                    "areasArr": [
                    "安源区",
                    "湘东区",
                    "莲花县",
                    "上栗县",
                    "芦溪县",
                    "市辖区"
                ],
                    "areas": {
                    "安源区": {
                        "id": 2146
                    },
                    "湘东区": {
                        "id": 2147
                    },
                    "莲花县": {
                        "id": 2148
                    },
                    "上栗县": {
                        "id": 2149
                    },
                    "芦溪县": {
                        "id": 2150
                    },
                    "市辖区": {
                        "id": 3970
                    }
                }
            }
        }
    },
    "山东省": {
        "id": 25,
            "citiesArr": [
            "菏泽市",
            "济南市",
            "青岛市",
            "淄博市",
            "德州市",
            "烟台市",
            "潍坊市",
            "济宁市",
            "泰安市",
            "临沂市",
            "滨州市",
            "东营市",
            "威海市",
            "枣庄市",
            "日照市",
            "莱芜市",
            "聊城市"
        ],
            "cities": {
            "菏泽市": {
                "id": 224,
                    "areasArr": [
                    "牡丹区",
                    "曹县",
                    "单县",
                    "成武县",
                    "巨野县",
                    "郓城县",
                    "鄄城县",
                    "定陶县",
                    "东明县",
                    "市辖区"
                ],
                    "areas": {
                    "牡丹区": {
                        "id": 2151
                    },
                    "曹县": {
                        "id": 2152
                    },
                    "单县": {
                        "id": 2153
                    },
                    "成武县": {
                        "id": 2154
                    },
                    "巨野县": {
                        "id": 2155
                    },
                    "郓城县": {
                        "id": 2156
                    },
                    "鄄城县": {
                        "id": 2157
                    },
                    "定陶县": {
                        "id": 2158
                    },
                    "东明县": {
                        "id": 2159
                    },
                    "市辖区": {
                        "id": 3995
                    }
                }
            },
            "济南市": {
                "id": 225,
                    "areasArr": [
                    "历下区",
                    "市中区",
                    "槐荫区",
                    "天桥区",
                    "历城区",
                    "长清区",
                    "平阴县",
                    "济阳县",
                    "商河县",
                    "章丘市",
                    "市辖区"
                ],
                    "areas": {
                    "历下区": {
                        "id": 2160
                    },
                    "市中区": {
                        "id": 2161
                    },
                    "槐荫区": {
                        "id": 2162
                    },
                    "天桥区": {
                        "id": 2163
                    },
                    "历城区": {
                        "id": 2164
                    },
                    "长清区": {
                        "id": 2165
                    },
                    "平阴县": {
                        "id": 2166
                    },
                    "济阳县": {
                        "id": 2167
                    },
                    "商河县": {
                        "id": 2168
                    },
                    "章丘市": {
                        "id": 2169
                    },
                    "市辖区": {
                        "id": 3979
                    }
                }
            },
            "青岛市": {
                "id": 226,
                    "areasArr": [
                    "市南区",
                    "市北区",
                    "四方区",
                    "黄岛区",
                    "崂山区",
                    "李沧区",
                    "城阳区",
                    "胶州市",
                    "即墨市",
                    "平度市",
                    "胶南市",
                    "莱西市",
                    "市辖区"
                ],
                    "areas": {
                    "市南区": {
                        "id": 2170
                    },
                    "市北区": {
                        "id": 2171
                    },
                    "四方区": {
                        "id": 2172
                    },
                    "黄岛区": {
                        "id": 2173
                    },
                    "崂山区": {
                        "id": 2174
                    },
                    "李沧区": {
                        "id": 2175
                    },
                    "城阳区": {
                        "id": 2176
                    },
                    "胶州市": {
                        "id": 2177
                    },
                    "即墨市": {
                        "id": 2178
                    },
                    "平度市": {
                        "id": 2179
                    },
                    "胶南市": {
                        "id": 2180
                    },
                    "莱西市": {
                        "id": 2181
                    },
                    "市辖区": {
                        "id": 3980
                    }
                }
            },
            "淄博市": {
                "id": 227,
                    "areasArr": [
                    "淄川区",
                    "张店区",
                    "博山区",
                    "临淄区",
                    "周村区",
                    "桓台县",
                    "高青县",
                    "沂源县",
                    "市辖区"
                ],
                    "areas": {
                    "淄川区": {
                        "id": 2182
                    },
                    "张店区": {
                        "id": 2183
                    },
                    "博山区": {
                        "id": 2184
                    },
                    "临淄区": {
                        "id": 2185
                    },
                    "周村区": {
                        "id": 2186
                    },
                    "桓台县": {
                        "id": 2187
                    },
                    "高青县": {
                        "id": 2188
                    },
                    "沂源县": {
                        "id": 2189
                    },
                    "市辖区": {
                        "id": 3981
                    }
                }
            },
            "德州市": {
                "id": 228,
                    "areasArr": [
                    "德城区",
                    "陵县",
                    "宁津县",
                    "庆云县",
                    "临邑县",
                    "齐河县",
                    "平原县",
                    "夏津县",
                    "武城县",
                    "乐陵市",
                    "禹城市",
                    "市辖区"
                ],
                    "areas": {
                    "德城区": {
                        "id": 2190
                    },
                    "陵县": {
                        "id": 2191
                    },
                    "宁津县": {
                        "id": 2192
                    },
                    "庆云县": {
                        "id": 2193
                    },
                    "临邑县": {
                        "id": 2194
                    },
                    "齐河县": {
                        "id": 2195
                    },
                    "平原县": {
                        "id": 2196
                    },
                    "夏津县": {
                        "id": 2197
                    },
                    "武城县": {
                        "id": 2198
                    },
                    "乐陵市": {
                        "id": 2199
                    },
                    "禹城市": {
                        "id": 2200
                    },
                    "市辖区": {
                        "id": 3992
                    }
                }
            },
            "烟台市": {
                "id": 229,
                    "areasArr": [
                    "芝罘区",
                    "福山区",
                    "牟平区",
                    "莱山区",
                    "长岛县",
                    "龙口市",
                    "莱阳市",
                    "莱州市",
                    "蓬莱市",
                    "招远市",
                    "栖霞市",
                    "海阳市",
                    "市辖区"
                ],
                    "areas": {
                    "芝罘区": {
                        "id": 2201
                    },
                    "福山区": {
                        "id": 2202
                    },
                    "牟平区": {
                        "id": 2203
                    },
                    "莱山区": {
                        "id": 2204
                    },
                    "长岛县": {
                        "id": 2205
                    },
                    "龙口市": {
                        "id": 2206
                    },
                    "莱阳市": {
                        "id": 2207
                    },
                    "莱州市": {
                        "id": 2208
                    },
                    "蓬莱市": {
                        "id": 2209
                    },
                    "招远市": {
                        "id": 2210
                    },
                    "栖霞市": {
                        "id": 2211
                    },
                    "海阳市": {
                        "id": 2212
                    },
                    "市辖区": {
                        "id": 3984
                    }
                }
            },
            "潍坊市": {
                "id": 230,
                    "areasArr": [
                    "潍城区",
                    "寒亭区",
                    "坊子区",
                    "奎文区",
                    "临朐县",
                    "昌乐县",
                    "青州市",
                    "诸城市",
                    "寿光市",
                    "安丘市",
                    "高密市",
                    "昌邑市",
                    "市辖区"
                ],
                    "areas": {
                    "潍城区": {
                        "id": 2213
                    },
                    "寒亭区": {
                        "id": 2214
                    },
                    "坊子区": {
                        "id": 2215
                    },
                    "奎文区": {
                        "id": 2216
                    },
                    "临朐县": {
                        "id": 2217
                    },
                    "昌乐县": {
                        "id": 2218
                    },
                    "青州市": {
                        "id": 2219
                    },
                    "诸城市": {
                        "id": 2220
                    },
                    "寿光市": {
                        "id": 2221
                    },
                    "安丘市": {
                        "id": 2222
                    },
                    "高密市": {
                        "id": 2223
                    },
                    "昌邑市": {
                        "id": 2224
                    },
                    "市辖区": {
                        "id": 3985
                    }
                }
            },
            "济宁市": {
                "id": 231,
                    "areasArr": [
                    "市中区",
                    "任城区",
                    "微山县",
                    "鱼台县",
                    "金乡县",
                    "嘉祥县",
                    "汶上县",
                    "泗水县",
                    "梁山县",
                    "曲阜市",
                    "兖州市",
                    "邹城市",
                    "市辖区"
                ],
                    "areas": {
                    "市中区": {
                        "id": 2225
                    },
                    "任城区": {
                        "id": 2226
                    },
                    "微山县": {
                        "id": 2227
                    },
                    "鱼台县": {
                        "id": 2228
                    },
                    "金乡县": {
                        "id": 2229
                    },
                    "嘉祥县": {
                        "id": 2230
                    },
                    "汶上县": {
                        "id": 2231
                    },
                    "泗水县": {
                        "id": 2232
                    },
                    "梁山县": {
                        "id": 2233
                    },
                    "曲阜市": {
                        "id": 2234
                    },
                    "兖州市": {
                        "id": 2235
                    },
                    "邹城市": {
                        "id": 2236
                    },
                    "市辖区": {
                        "id": 3986
                    }
                }
            },
            "泰安市": {
                "id": 232,
                    "areasArr": [
                    "泰山区",
                    "岱岳区",
                    "宁阳县",
                    "东平县",
                    "新泰市",
                    "肥城市",
                    "市辖区"
                ],
                    "areas": {
                    "泰山区": {
                        "id": 2237
                    },
                    "岱岳区": {
                        "id": 2238
                    },
                    "宁阳县": {
                        "id": 2239
                    },
                    "东平县": {
                        "id": 2240
                    },
                    "新泰市": {
                        "id": 2241
                    },
                    "肥城市": {
                        "id": 2242
                    },
                    "市辖区": {
                        "id": 3987
                    }
                }
            },
            "临沂市": {
                "id": 233,
                    "areasArr": [
                    "兰山区",
                    "罗庄区",
                    "河东区",
                    "沂南县",
                    "郯城县",
                    "沂水县",
                    "苍山县",
                    "费县",
                    "平邑县",
                    "莒南县",
                    "蒙阴县",
                    "临沭县",
                    "市辖区"
                ],
                    "areas": {
                    "兰山区": {
                        "id": 2243
                    },
                    "罗庄区": {
                        "id": 2244
                    },
                    "河东区": {
                        "id": 2245
                    },
                    "沂南县": {
                        "id": 2246
                    },
                    "郯城县": {
                        "id": 2247
                    },
                    "沂水县": {
                        "id": 2248
                    },
                    "苍山县": {
                        "id": 2249
                    },
                    "费县": {
                        "id": 2250
                    },
                    "平邑县": {
                        "id": 2251
                    },
                    "莒南县": {
                        "id": 2252
                    },
                    "蒙阴县": {
                        "id": 2253
                    },
                    "临沭县": {
                        "id": 2254
                    },
                    "市辖区": {
                        "id": 3991
                    }
                }
            },
            "滨州市": {
                "id": 234,
                    "areasArr": [
                    "滨城区",
                    "惠民县",
                    "阳信县",
                    "无棣县",
                    "沾化县",
                    "博兴县",
                    "邹平县",
                    "市辖区"
                ],
                    "areas": {
                    "滨城区": {
                        "id": 2255
                    },
                    "惠民县": {
                        "id": 2256
                    },
                    "阳信县": {
                        "id": 2257
                    },
                    "无棣县": {
                        "id": 2258
                    },
                    "沾化县": {
                        "id": 2259
                    },
                    "博兴县": {
                        "id": 2260
                    },
                    "邹平县": {
                        "id": 2261
                    },
                    "市辖区": {
                        "id": 3994
                    }
                }
            },
            "东营市": {
                "id": 235,
                    "areasArr": [
                    "东营区",
                    "河口区",
                    "垦利县",
                    "利津县",
                    "广饶县",
                    "市辖区"
                ],
                    "areas": {
                    "东营区": {
                        "id": 2262
                    },
                    "河口区": {
                        "id": 2263
                    },
                    "垦利县": {
                        "id": 2264
                    },
                    "利津县": {
                        "id": 2265
                    },
                    "广饶县": {
                        "id": 2266
                    },
                    "市辖区": {
                        "id": 3983
                    }
                }
            },
            "威海市": {
                "id": 236,
                    "areasArr": [
                    "环翠区",
                    "文登市",
                    "荣成市",
                    "乳山市",
                    "市辖区"
                ],
                    "areas": {
                    "环翠区": {
                        "id": 2267
                    },
                    "文登市": {
                        "id": 2268
                    },
                    "荣成市": {
                        "id": 2269
                    },
                    "乳山市": {
                        "id": 2270
                    },
                    "市辖区": {
                        "id": 3988
                    }
                }
            },
            "枣庄市": {
                "id": 237,
                    "areasArr": [
                    "市中区",
                    "薛城区",
                    "峄城区",
                    "台儿庄区",
                    "山亭区",
                    "滕州市",
                    "市辖区"
                ],
                    "areas": {
                    "市中区": {
                        "id": 2271
                    },
                    "薛城区": {
                        "id": 2272
                    },
                    "峄城区": {
                        "id": 2273
                    },
                    "台儿庄区": {
                        "id": 2274
                    },
                    "山亭区": {
                        "id": 2275
                    },
                    "滕州市": {
                        "id": 2276
                    },
                    "市辖区": {
                        "id": 3982
                    }
                }
            },
            "日照市": {
                "id": 238,
                    "areasArr": [
                    "东港区",
                    "岚山区",
                    "五莲县",
                    "莒县",
                    "市辖区"
                ],
                    "areas": {
                    "东港区": {
                        "id": 2277
                    },
                    "岚山区": {
                        "id": 2278
                    },
                    "五莲县": {
                        "id": 2279
                    },
                    "莒县": {
                        "id": 2280
                    },
                    "市辖区": {
                        "id": 3989
                    }
                }
            },
            "莱芜市": {
                "id": 239,
                    "areasArr": [
                    "莱城区",
                    "钢城区",
                    "市辖区"
                ],
                    "areas": {
                    "莱城区": {
                        "id": 2281
                    },
                    "钢城区": {
                        "id": 2282
                    },
                    "市辖区": {
                        "id": 3990
                    }
                }
            },
            "聊城市": {
                "id": 240,
                    "areasArr": [
                    "东昌府区",
                    "阳谷县",
                    "莘县",
                    "茌平县",
                    "东阿县",
                    "冠县",
                    "高唐县",
                    "临清市",
                    "市辖区"
                ],
                    "areas": {
                    "东昌府区": {
                        "id": 2283
                    },
                    "阳谷县": {
                        "id": 2284
                    },
                    "莘县": {
                        "id": 2285
                    },
                    "茌平县": {
                        "id": 2286
                    },
                    "东阿县": {
                        "id": 2287
                    },
                    "冠县": {
                        "id": 2288
                    },
                    "高唐县": {
                        "id": 2289
                    },
                    "临清市": {
                        "id": 2290
                    },
                    "市辖区": {
                        "id": 3993
                    }
                }
            }
        }
    },
    "河南省": {
        "id": 26,
            "citiesArr": [
            "商丘市",
            "郑州市",
            "安阳市",
            "新乡市",
            "许昌市",
            "平顶山市",
            "信阳市",
            "南阳市",
            "开封市",
            "洛阳市",
            "省直辖县级行政区划",
            "焦作市",
            "鹤壁市",
            "濮阳市",
            "周口市",
            "漯河市",
            "驻马店市",
            "三门峡市"
        ],
            "cities": {
            "商丘市": {
                "id": 241,
                    "areasArr": [
                    "梁园区",
                    "睢阳区",
                    "民权县",
                    "睢县",
                    "宁陵县",
                    "柘城县",
                    "虞城县",
                    "夏邑县",
                    "永城市",
                    "市辖区"
                ],
                    "areas": {
                    "梁园区": {
                        "id": 2291
                    },
                    "睢阳区": {
                        "id": 2292
                    },
                    "民权县": {
                        "id": 2293
                    },
                    "睢县": {
                        "id": 2294
                    },
                    "宁陵县": {
                        "id": 2295
                    },
                    "柘城县": {
                        "id": 2296
                    },
                    "虞城县": {
                        "id": 2297
                    },
                    "夏邑县": {
                        "id": 2298
                    },
                    "永城市": {
                        "id": 2299
                    },
                    "市辖区": {
                        "id": 4009
                    }
                }
            },
            "郑州市": {
                "id": 242,
                    "areasArr": [
                    "中原区",
                    "二七区",
                    "管城回族区",
                    "金水区",
                    "上街区",
                    "惠济区",
                    "中牟县",
                    "巩义市",
                    "荥阳市",
                    "新密市",
                    "新郑市",
                    "登封市",
                    "市辖区"
                ],
                    "areas": {
                    "中原区": {
                        "id": 2300
                    },
                    "二七区": {
                        "id": 2301
                    },
                    "管城回族区": {
                        "id": 2302
                    },
                    "金水区": {
                        "id": 2303
                    },
                    "上街区": {
                        "id": 2304
                    },
                    "惠济区": {
                        "id": 2305
                    },
                    "中牟县": {
                        "id": 2306
                    },
                    "巩义市": {
                        "id": 2307
                    },
                    "荥阳市": {
                        "id": 2308
                    },
                    "新密市": {
                        "id": 2309
                    },
                    "新郑市": {
                        "id": 2310
                    },
                    "登封市": {
                        "id": 2311
                    },
                    "市辖区": {
                        "id": 3996
                    }
                }
            },
            "安阳市": {
                "id": 243,
                    "areasArr": [
                    "文峰区",
                    "北关区",
                    "殷都区",
                    "龙安区",
                    "安阳县",
                    "汤阴县",
                    "滑县",
                    "内黄县",
                    "林州市",
                    "市辖区"
                ],
                    "areas": {
                    "文峰区": {
                        "id": 2312
                    },
                    "北关区": {
                        "id": 2313
                    },
                    "殷都区": {
                        "id": 2314
                    },
                    "龙安区": {
                        "id": 2315
                    },
                    "安阳县": {
                        "id": 2316
                    },
                    "汤阴县": {
                        "id": 2317
                    },
                    "滑县": {
                        "id": 2318
                    },
                    "内黄县": {
                        "id": 2319
                    },
                    "林州市": {
                        "id": 2320
                    },
                    "市辖区": {
                        "id": 4000
                    }
                }
            },
            "新乡市": {
                "id": 244,
                    "areasArr": [
                    "红旗区",
                    "卫滨区",
                    "凤泉区",
                    "牧野区",
                    "新乡县",
                    "获嘉县",
                    "原阳县",
                    "延津县",
                    "封丘县",
                    "长垣县",
                    "卫辉市",
                    "辉县市",
                    "市辖区"
                ],
                    "areas": {
                    "红旗区": {
                        "id": 2321
                    },
                    "卫滨区": {
                        "id": 2322
                    },
                    "凤泉区": {
                        "id": 2323
                    },
                    "牧野区": {
                        "id": 2324
                    },
                    "新乡县": {
                        "id": 2325
                    },
                    "获嘉县": {
                        "id": 2326
                    },
                    "原阳县": {
                        "id": 2327
                    },
                    "延津县": {
                        "id": 2328
                    },
                    "封丘县": {
                        "id": 2329
                    },
                    "长垣县": {
                        "id": 2330
                    },
                    "卫辉市": {
                        "id": 2331
                    },
                    "辉县市": {
                        "id": 2332
                    },
                    "市辖区": {
                        "id": 4002
                    }
                }
            },
            "许昌市": {
                "id": 245,
                    "areasArr": [
                    "魏都区",
                    "许昌县",
                    "鄢陵县",
                    "襄城县",
                    "禹州市",
                    "长葛市",
                    "市辖区"
                ],
                    "areas": {
                    "魏都区": {
                        "id": 2333
                    },
                    "许昌县": {
                        "id": 2334
                    },
                    "鄢陵县": {
                        "id": 2335
                    },
                    "襄城县": {
                        "id": 2336
                    },
                    "禹州市": {
                        "id": 2337
                    },
                    "长葛市": {
                        "id": 2338
                    },
                    "市辖区": {
                        "id": 4005
                    }
                }
            },
            "平顶山市": {
                "id": 246,
                    "areasArr": [
                    "新华区",
                    "卫东区",
                    "石龙区",
                    "湛河区",
                    "宝丰县",
                    "叶县",
                    "鲁山县",
                    "郏县",
                    "舞钢市",
                    "汝州市",
                    "市辖区"
                ],
                    "areas": {
                    "新华区": {
                        "id": 2339
                    },
                    "卫东区": {
                        "id": 2340
                    },
                    "石龙区": {
                        "id": 2341
                    },
                    "湛河区": {
                        "id": 2342
                    },
                    "宝丰县": {
                        "id": 2343
                    },
                    "叶县": {
                        "id": 2344
                    },
                    "鲁山县": {
                        "id": 2345
                    },
                    "郏县": {
                        "id": 2346
                    },
                    "舞钢市": {
                        "id": 2347
                    },
                    "汝州市": {
                        "id": 2348
                    },
                    "市辖区": {
                        "id": 3999
                    }
                }
            },
            "信阳市": {
                "id": 247,
                    "areasArr": [
                    "浉河区",
                    "平桥区",
                    "罗山县",
                    "光山县",
                    "新县",
                    "商城县",
                    "固始县",
                    "潢川县",
                    "淮滨县",
                    "息县",
                    "市辖区"
                ],
                    "areas": {
                    "浉河区": {
                        "id": 2349
                    },
                    "平桥区": {
                        "id": 2350
                    },
                    "罗山县": {
                        "id": 2351
                    },
                    "光山县": {
                        "id": 2352
                    },
                    "新县": {
                        "id": 2353
                    },
                    "商城县": {
                        "id": 2354
                    },
                    "固始县": {
                        "id": 2355
                    },
                    "潢川县": {
                        "id": 2356
                    },
                    "淮滨县": {
                        "id": 2357
                    },
                    "息县": {
                        "id": 2358
                    },
                    "市辖区": {
                        "id": 4010
                    }
                }
            },
            "南阳市": {
                "id": 248,
                    "areasArr": [
                    "宛城区",
                    "卧龙区",
                    "南召县",
                    "方城县",
                    "西峡县",
                    "镇平县",
                    "内乡县",
                    "淅川县",
                    "社旗县",
                    "唐河县",
                    "新野县",
                    "桐柏县",
                    "邓州市",
                    "市辖区"
                ],
                    "areas": {
                    "宛城区": {
                        "id": 2359
                    },
                    "卧龙区": {
                        "id": 2360
                    },
                    "南召县": {
                        "id": 2361
                    },
                    "方城县": {
                        "id": 2362
                    },
                    "西峡县": {
                        "id": 2363
                    },
                    "镇平县": {
                        "id": 2364
                    },
                    "内乡县": {
                        "id": 2365
                    },
                    "淅川县": {
                        "id": 2366
                    },
                    "社旗县": {
                        "id": 2367
                    },
                    "唐河县": {
                        "id": 2368
                    },
                    "新野县": {
                        "id": 2369
                    },
                    "桐柏县": {
                        "id": 2370
                    },
                    "邓州市": {
                        "id": 2371
                    },
                    "市辖区": {
                        "id": 4008
                    }
                }
            },
            "开封市": {
                "id": 249,
                    "areasArr": [
                    "龙亭区",
                    "顺河回族区",
                    "鼓楼区",
                    "禹王台区",
                    "金明区",
                    "杞县",
                    "通许县",
                    "尉氏县",
                    "开封县",
                    "兰考县",
                    "市辖区"
                ],
                    "areas": {
                    "龙亭区": {
                        "id": 2372
                    },
                    "顺河回族区": {
                        "id": 2373
                    },
                    "鼓楼区": {
                        "id": 2374
                    },
                    "禹王台区": {
                        "id": 2375
                    },
                    "金明区": {
                        "id": 2376
                    },
                    "杞县": {
                        "id": 2377
                    },
                    "通许县": {
                        "id": 2378
                    },
                    "尉氏县": {
                        "id": 2379
                    },
                    "开封县": {
                        "id": 2380
                    },
                    "兰考县": {
                        "id": 2381
                    },
                    "市辖区": {
                        "id": 3997
                    }
                }
            },
            "洛阳市": {
                "id": 250,
                    "areasArr": [
                    "老城区",
                    "西工区",
                    "瀍河回族区",
                    "涧西区",
                    "吉利区",
                    "洛龙区",
                    "孟津县",
                    "新安县",
                    "栾川县",
                    "嵩县",
                    "汝阳县",
                    "宜阳县",
                    "洛宁县",
                    "伊川县",
                    "偃师市",
                    "市辖区"
                ],
                    "areas": {
                    "老城区": {
                        "id": 2382
                    },
                    "西工区": {
                        "id": 2383
                    },
                    "瀍河回族区": {
                        "id": 2384
                    },
                    "涧西区": {
                        "id": 2385
                    },
                    "吉利区": {
                        "id": 2386
                    },
                    "洛龙区": {
                        "id": 2387
                    },
                    "孟津县": {
                        "id": 2388
                    },
                    "新安县": {
                        "id": 2389
                    },
                    "栾川县": {
                        "id": 2390
                    },
                    "嵩县": {
                        "id": 2391
                    },
                    "汝阳县": {
                        "id": 2392
                    },
                    "宜阳县": {
                        "id": 2393
                    },
                    "洛宁县": {
                        "id": 2394
                    },
                    "伊川县": {
                        "id": 2395
                    },
                    "偃师市": {
                        "id": 2396
                    },
                    "市辖区": {
                        "id": 3998
                    }
                }
            },
            "省直辖县级行政区划": {
                "id": 251,
                    "areasArr": [
                    "济源市"
                ],
                    "areas": {
                    "济源市": {
                        "id": 4150
                    }
                }
            },
            "焦作市": {
                "id": 252,
                    "areasArr": [
                    "解放区",
                    "中站区",
                    "马村区",
                    "山阳区",
                    "修武县",
                    "博爱县",
                    "武陟县",
                    "温县",
                    "沁阳市",
                    "孟州市",
                    "市辖区"
                ],
                    "areas": {
                    "解放区": {
                        "id": 2397
                    },
                    "中站区": {
                        "id": 2398
                    },
                    "马村区": {
                        "id": 2399
                    },
                    "山阳区": {
                        "id": 2400
                    },
                    "修武县": {
                        "id": 2401
                    },
                    "博爱县": {
                        "id": 2402
                    },
                    "武陟县": {
                        "id": 2403
                    },
                    "温县": {
                        "id": 2404
                    },
                    "沁阳市": {
                        "id": 2405
                    },
                    "孟州市": {
                        "id": 2406
                    },
                    "市辖区": {
                        "id": 4003
                    }
                }
            },
            "鹤壁市": {
                "id": 253,
                    "areasArr": [
                    "鹤山区",
                    "山城区",
                    "淇滨区",
                    "浚县",
                    "淇县",
                    "市辖区"
                ],
                    "areas": {
                    "鹤山区": {
                        "id": 2407
                    },
                    "山城区": {
                        "id": 2408
                    },
                    "淇滨区": {
                        "id": 2409
                    },
                    "浚县": {
                        "id": 2410
                    },
                    "淇县": {
                        "id": 2411
                    },
                    "市辖区": {
                        "id": 4001
                    }
                }
            },
            "濮阳市": {
                "id": 254,
                    "areasArr": [
                    "华龙区",
                    "清丰县",
                    "南乐县",
                    "范县",
                    "台前县",
                    "濮阳县",
                    "市辖区"
                ],
                    "areas": {
                    "华龙区": {
                        "id": 2412
                    },
                    "清丰县": {
                        "id": 2413
                    },
                    "南乐县": {
                        "id": 2414
                    },
                    "范县": {
                        "id": 2415
                    },
                    "台前县": {
                        "id": 2416
                    },
                    "濮阳县": {
                        "id": 2417
                    },
                    "市辖区": {
                        "id": 4004
                    }
                }
            },
            "周口市": {
                "id": 255,
                    "areasArr": [
                    "川汇区",
                    "扶沟县",
                    "西华县",
                    "商水县",
                    "沈丘县",
                    "郸城县",
                    "淮阳县",
                    "太康县",
                    "鹿邑县",
                    "项城市",
                    "市辖区"
                ],
                    "areas": {
                    "川汇区": {
                        "id": 2418
                    },
                    "扶沟县": {
                        "id": 2419
                    },
                    "西华县": {
                        "id": 2420
                    },
                    "商水县": {
                        "id": 2421
                    },
                    "沈丘县": {
                        "id": 2422
                    },
                    "郸城县": {
                        "id": 2423
                    },
                    "淮阳县": {
                        "id": 2424
                    },
                    "太康县": {
                        "id": 2425
                    },
                    "鹿邑县": {
                        "id": 2426
                    },
                    "项城市": {
                        "id": 2427
                    },
                    "市辖区": {
                        "id": 4011
                    }
                }
            },
            "漯河市": {
                "id": 256,
                    "areasArr": [
                    "源汇区",
                    "郾城区",
                    "召陵区",
                    "舞阳县",
                    "临颍县",
                    "市辖区"
                ],
                    "areas": {
                    "源汇区": {
                        "id": 2428
                    },
                    "郾城区": {
                        "id": 2429
                    },
                    "召陵区": {
                        "id": 2430
                    },
                    "舞阳县": {
                        "id": 2431
                    },
                    "临颍县": {
                        "id": 2432
                    },
                    "市辖区": {
                        "id": 4006
                    }
                }
            },
            "驻马店市": {
                "id": 257,
                    "areasArr": [
                    "驿城区",
                    "西平县",
                    "上蔡县",
                    "平舆县",
                    "正阳县",
                    "确山县",
                    "泌阳县",
                    "汝南县",
                    "遂平县",
                    "新蔡县",
                    "市辖区"
                ],
                    "areas": {
                    "驿城区": {
                        "id": 2433
                    },
                    "西平县": {
                        "id": 2434
                    },
                    "上蔡县": {
                        "id": 2435
                    },
                    "平舆县": {
                        "id": 2436
                    },
                    "正阳县": {
                        "id": 2437
                    },
                    "确山县": {
                        "id": 2438
                    },
                    "泌阳县": {
                        "id": 2439
                    },
                    "汝南县": {
                        "id": 2440
                    },
                    "遂平县": {
                        "id": 2441
                    },
                    "新蔡县": {
                        "id": 2442
                    },
                    "市辖区": {
                        "id": 4012
                    }
                }
            },
            "三门峡市": {
                "id": 258,
                    "areasArr": [
                    "湖滨区",
                    "渑池县",
                    "陕县",
                    "卢氏县",
                    "义马市",
                    "灵宝市",
                    "市辖区"
                ],
                    "areas": {
                    "湖滨区": {
                        "id": 2443
                    },
                    "渑池县": {
                        "id": 2444
                    },
                    "陕县": {
                        "id": 2445
                    },
                    "卢氏县": {
                        "id": 2446
                    },
                    "义马市": {
                        "id": 2447
                    },
                    "灵宝市": {
                        "id": 2448
                    },
                    "市辖区": {
                        "id": 4007
                    }
                }
            }
        }
    },
    "湖北省": {
        "id": 27,
            "citiesArr": [
            "武汉市",
            "襄樊市",
            "鄂州市",
            "孝感市",
            "黄冈市",
            "黄石市",
            "咸宁市",
            "荆州市",
            "宜昌市",
            "恩施土家族苗族自治州",
            "十堰市",
            "随州市",
            "荆门市",
            "省直辖县级行政区划"
        ],
            "cities": {
            "武汉市": {
                "id": 259,
                    "areasArr": [
                    "江岸区",
                    "江汉区",
                    "硚口区",
                    "汉阳区",
                    "武昌区",
                    "青山区",
                    "洪山区",
                    "东西湖区",
                    "汉南区",
                    "蔡甸区",
                    "江夏区",
                    "黄陂区",
                    "新洲区",
                    "市辖区"
                ],
                    "areas": {
                    "江岸区": {
                        "id": 2449
                    },
                    "江汉区": {
                        "id": 2450
                    },
                    "硚口区": {
                        "id": 2451
                    },
                    "汉阳区": {
                        "id": 2452
                    },
                    "武昌区": {
                        "id": 2453
                    },
                    "青山区": {
                        "id": 2454
                    },
                    "洪山区": {
                        "id": 2455
                    },
                    "东西湖区": {
                        "id": 2456
                    },
                    "汉南区": {
                        "id": 2457
                    },
                    "蔡甸区": {
                        "id": 2458
                    },
                    "江夏区": {
                        "id": 2459
                    },
                    "黄陂区": {
                        "id": 2460
                    },
                    "新洲区": {
                        "id": 2461
                    },
                    "市辖区": {
                        "id": 4013
                    }
                }
            },
            "襄樊市": {
                "id": 260,
                    "areasArr": [
                    "襄城区",
                    "樊城区",
                    "襄阳区",
                    "南漳县",
                    "谷城县",
                    "保康县",
                    "老河口市",
                    "枣阳市",
                    "宜城市",
                    "市辖区"
                ],
                    "areas": {
                    "襄城区": {
                        "id": 2462
                    },
                    "樊城区": {
                        "id": 2463
                    },
                    "襄阳区": {
                        "id": 2464
                    },
                    "南漳县": {
                        "id": 2465
                    },
                    "谷城县": {
                        "id": 2466
                    },
                    "保康县": {
                        "id": 2467
                    },
                    "老河口市": {
                        "id": 2468
                    },
                    "枣阳市": {
                        "id": 2469
                    },
                    "宜城市": {
                        "id": 2470
                    },
                    "市辖区": {
                        "id": 4017
                    }
                }
            },
            "鄂州市": {
                "id": 261,
                    "areasArr": [
                    "梁子湖区",
                    "华容区",
                    "鄂城区",
                    "市辖区"
                ],
                    "areas": {
                    "梁子湖区": {
                        "id": 2471
                    },
                    "华容区": {
                        "id": 2472
                    },
                    "鄂城区": {
                        "id": 2473
                    },
                    "市辖区": {
                        "id": 4018
                    }
                }
            },
            "孝感市": {
                "id": 262,
                    "areasArr": [
                    "孝南区",
                    "孝昌县",
                    "大悟县",
                    "云梦县",
                    "应城市",
                    "安陆市",
                    "汉川市",
                    "市辖区"
                ],
                    "areas": {
                    "孝南区": {
                        "id": 2474
                    },
                    "孝昌县": {
                        "id": 2475
                    },
                    "大悟县": {
                        "id": 2476
                    },
                    "云梦县": {
                        "id": 2477
                    },
                    "应城市": {
                        "id": 2478
                    },
                    "安陆市": {
                        "id": 2479
                    },
                    "汉川市": {
                        "id": 2480
                    },
                    "市辖区": {
                        "id": 4020
                    }
                }
            },
            "黄冈市": {
                "id": 263,
                    "areasArr": [
                    "黄州区",
                    "团风县",
                    "红安县",
                    "罗田县",
                    "英山县",
                    "浠水县",
                    "蕲春县",
                    "黄梅县",
                    "麻城市",
                    "武穴市",
                    "市辖区"
                ],
                    "areas": {
                    "黄州区": {
                        "id": 2481
                    },
                    "团风县": {
                        "id": 2482
                    },
                    "红安县": {
                        "id": 2483
                    },
                    "罗田县": {
                        "id": 2484
                    },
                    "英山县": {
                        "id": 2485
                    },
                    "浠水县": {
                        "id": 2486
                    },
                    "蕲春县": {
                        "id": 2487
                    },
                    "黄梅县": {
                        "id": 2488
                    },
                    "麻城市": {
                        "id": 2489
                    },
                    "武穴市": {
                        "id": 2490
                    },
                    "市辖区": {
                        "id": 4022
                    }
                }
            },
            "黄石市": {
                "id": 264,
                    "areasArr": [
                    "黄石港区",
                    "西塞山区",
                    "下陆区",
                    "铁山区",
                    "阳新县",
                    "大冶市",
                    "市辖区"
                ],
                    "areas": {
                    "黄石港区": {
                        "id": 2491
                    },
                    "西塞山区": {
                        "id": 2492
                    },
                    "下陆区": {
                        "id": 2493
                    },
                    "铁山区": {
                        "id": 2494
                    },
                    "阳新县": {
                        "id": 2495
                    },
                    "大冶市": {
                        "id": 2496
                    },
                    "市辖区": {
                        "id": 4014
                    }
                }
            },
            "咸宁市": {
                "id": 265,
                    "areasArr": [
                    "咸安区",
                    "嘉鱼县",
                    "通城县",
                    "崇阳县",
                    "通山县",
                    "赤壁市",
                    "市辖区"
                ],
                    "areas": {
                    "咸安区": {
                        "id": 2497
                    },
                    "嘉鱼县": {
                        "id": 2498
                    },
                    "通城县": {
                        "id": 2499
                    },
                    "崇阳县": {
                        "id": 2500
                    },
                    "通山县": {
                        "id": 2501
                    },
                    "赤壁市": {
                        "id": 2502
                    },
                    "市辖区": {
                        "id": 4023
                    }
                }
            },
            "荆州市": {
                "id": 266,
                    "areasArr": [
                    "沙市区",
                    "荆州区",
                    "公安县",
                    "监利县",
                    "江陵县",
                    "石首市",
                    "洪湖市",
                    "松滋市",
                    "市辖区"
                ],
                    "areas": {
                    "沙市区": {
                        "id": 2503
                    },
                    "荆州区": {
                        "id": 2504
                    },
                    "公安县": {
                        "id": 2505
                    },
                    "监利县": {
                        "id": 2506
                    },
                    "江陵县": {
                        "id": 2507
                    },
                    "石首市": {
                        "id": 2508
                    },
                    "洪湖市": {
                        "id": 2509
                    },
                    "松滋市": {
                        "id": 2510
                    },
                    "市辖区": {
                        "id": 4021
                    }
                }
            },
            "宜昌市": {
                "id": 267,
                    "areasArr": [
                    "西陵区",
                    "伍家岗区",
                    "点军区",
                    "猇亭区",
                    "夷陵区",
                    "远安县",
                    "兴山县",
                    "秭归县",
                    "长阳土家族自治县",
                    "五峰土家族自治县",
                    "宜都市",
                    "当阳市",
                    "枝江市",
                    "市辖区"
                ],
                    "areas": {
                    "西陵区": {
                        "id": 2511
                    },
                    "伍家岗区": {
                        "id": 2512
                    },
                    "点军区": {
                        "id": 2513
                    },
                    "猇亭区": {
                        "id": 2514
                    },
                    "夷陵区": {
                        "id": 2515
                    },
                    "远安县": {
                        "id": 2516
                    },
                    "兴山县": {
                        "id": 2517
                    },
                    "秭归县": {
                        "id": 2518
                    },
                    "长阳土家族自治县": {
                        "id": 2519
                    },
                    "五峰土家族自治县": {
                        "id": 2520
                    },
                    "宜都市": {
                        "id": 2521
                    },
                    "当阳市": {
                        "id": 2522
                    },
                    "枝江市": {
                        "id": 2523
                    },
                    "市辖区": {
                        "id": 4016
                    }
                }
            },
            "恩施土家族苗族自治州": {
                "id": 268,
                    "areasArr": [
                    "恩施市",
                    "利川市",
                    "建始县",
                    "巴东县",
                    "宣恩县",
                    "咸丰县",
                    "来凤县",
                    "鹤峰县"
                ],
                    "areas": {
                    "恩施市": {
                        "id": 2524
                    },
                    "利川市": {
                        "id": 2525
                    },
                    "建始县": {
                        "id": 2526
                    },
                    "巴东县": {
                        "id": 2527
                    },
                    "宣恩县": {
                        "id": 2528
                    },
                    "咸丰县": {
                        "id": 2529
                    },
                    "来凤县": {
                        "id": 2530
                    },
                    "鹤峰县": {
                        "id": 2531
                    }
                }
            },
            "十堰市": {
                "id": 270,
                    "areasArr": [
                    "茅箭区",
                    "张湾区",
                    "郧县",
                    "郧西县",
                    "竹山县",
                    "竹溪县",
                    "房县",
                    "丹江口市",
                    "市辖区"
                ],
                    "areas": {
                    "茅箭区": {
                        "id": 2532
                    },
                    "张湾区": {
                        "id": 2533
                    },
                    "郧县": {
                        "id": 2534
                    },
                    "郧西县": {
                        "id": 2535
                    },
                    "竹山县": {
                        "id": 2536
                    },
                    "竹溪县": {
                        "id": 2537
                    },
                    "房县": {
                        "id": 2538
                    },
                    "丹江口市": {
                        "id": 2539
                    },
                    "市辖区": {
                        "id": 4015
                    }
                }
            },
            "随州市": {
                "id": 271,
                    "areasArr": [
                    "曾都区",
                    "广水市",
                    "市辖区"
                ],
                    "areas": {
                    "曾都区": {
                        "id": 2540
                    },
                    "广水市": {
                        "id": 2541
                    },
                    "市辖区": {
                        "id": 4024
                    }
                }
            },
            "荆门市": {
                "id": 272,
                    "areasArr": [
                    "东宝区",
                    "掇刀区",
                    "京山县",
                    "沙洋县",
                    "钟祥市",
                    "市辖区"
                ],
                    "areas": {
                    "东宝区": {
                        "id": 2542
                    },
                    "掇刀区": {
                        "id": 2543
                    },
                    "京山县": {
                        "id": 2544
                    },
                    "沙洋县": {
                        "id": 2545
                    },
                    "钟祥市": {
                        "id": 2546
                    },
                    "市辖区": {
                        "id": 4019
                    }
                }
            },
            "省直辖县级行政区划": {
                "id": 273,
                    "areasArr": [
                    "仙桃市",
                    "潜江市",
                    "天门市",
                    "神农架林区"
                ],
                    "areas": {
                    "仙桃市": {
                        "id": 3825
                    },
                    "潜江市": {
                        "id": 3826
                    },
                    "天门市": {
                        "id": 3827
                    },
                    "神农架林区": {
                        "id": 3828
                    }
                }
            }
        }
    },
    "湖南省": {
        "id": 28,
            "citiesArr": [
            "岳阳市",
            "长沙市",
            "湘潭市",
            "株洲市",
            "衡阳市",
            "郴州市",
            "常德市",
            "益阳市",
            "娄底市",
            "邵阳市",
            "湘西土家族苗族自治州",
            "张家界市",
            "怀化市",
            "永州市"
        ],
            "cities": {
            "岳阳市": {
                "id": 276,
                    "areasArr": [
                    "岳阳楼区",
                    "云溪区",
                    "君山区",
                    "岳阳县",
                    "华容县",
                    "湘阴县",
                    "平江县",
                    "汨罗市",
                    "临湘市",
                    "市辖区"
                ],
                    "areas": {
                    "岳阳楼区": {
                        "id": 2547
                    },
                    "云溪区": {
                        "id": 2548
                    },
                    "君山区": {
                        "id": 2549
                    },
                    "岳阳县": {
                        "id": 2550
                    },
                    "华容县": {
                        "id": 2551
                    },
                    "湘阴县": {
                        "id": 2552
                    },
                    "平江县": {
                        "id": 2553
                    },
                    "汨罗市": {
                        "id": 2554
                    },
                    "临湘市": {
                        "id": 2555
                    },
                    "市辖区": {
                        "id": 4030
                    }
                }
            },
            "长沙市": {
                "id": 277,
                    "areasArr": [
                    "芙蓉区",
                    "天心区",
                    "岳麓区",
                    "开福区",
                    "雨花区",
                    "长沙县",
                    "望城县",
                    "宁乡县",
                    "浏阳市",
                    "市辖区"
                ],
                    "areas": {
                    "芙蓉区": {
                        "id": 2556
                    },
                    "天心区": {
                        "id": 2557
                    },
                    "岳麓区": {
                        "id": 2558
                    },
                    "开福区": {
                        "id": 2559
                    },
                    "雨花区": {
                        "id": 2560
                    },
                    "长沙县": {
                        "id": 2561
                    },
                    "望城县": {
                        "id": 2562
                    },
                    "宁乡县": {
                        "id": 2563
                    },
                    "浏阳市": {
                        "id": 2564
                    },
                    "市辖区": {
                        "id": 4025
                    }
                }
            },
            "湘潭市": {
                "id": 278,
                    "areasArr": [
                    "雨湖区",
                    "岳塘区",
                    "湘潭县",
                    "湘乡市",
                    "韶山市",
                    "市辖区"
                ],
                    "areas": {
                    "雨湖区": {
                        "id": 2565
                    },
                    "岳塘区": {
                        "id": 2566
                    },
                    "湘潭县": {
                        "id": 2567
                    },
                    "湘乡市": {
                        "id": 2568
                    },
                    "韶山市": {
                        "id": 2569
                    },
                    "市辖区": {
                        "id": 4027
                    }
                }
            },
            "株洲市": {
                "id": 279,
                    "areasArr": [
                    "荷塘区",
                    "芦淞区",
                    "石峰区",
                    "天元区",
                    "株洲县",
                    "攸县",
                    "茶陵县",
                    "炎陵县",
                    "醴陵市",
                    "市辖区"
                ],
                    "areas": {
                    "荷塘区": {
                        "id": 2570
                    },
                    "芦淞区": {
                        "id": 2571
                    },
                    "石峰区": {
                        "id": 2572
                    },
                    "天元区": {
                        "id": 2573
                    },
                    "株洲县": {
                        "id": 2574
                    },
                    "攸县": {
                        "id": 2575
                    },
                    "茶陵县": {
                        "id": 2576
                    },
                    "炎陵县": {
                        "id": 2577
                    },
                    "醴陵市": {
                        "id": 2578
                    },
                    "市辖区": {
                        "id": 4026
                    }
                }
            },
            "衡阳市": {
                "id": 280,
                    "areasArr": [
                    "珠晖区",
                    "雁峰区",
                    "石鼓区",
                    "蒸湘区",
                    "南岳区",
                    "衡阳县",
                    "衡南县",
                    "衡山县",
                    "衡东县",
                    "祁东县",
                    "耒阳市",
                    "常宁市",
                    "市辖区"
                ],
                    "areas": {
                    "珠晖区": {
                        "id": 2579
                    },
                    "雁峰区": {
                        "id": 2580
                    },
                    "石鼓区": {
                        "id": 2581
                    },
                    "蒸湘区": {
                        "id": 2582
                    },
                    "南岳区": {
                        "id": 2583
                    },
                    "衡阳县": {
                        "id": 2584
                    },
                    "衡南县": {
                        "id": 2585
                    },
                    "衡山县": {
                        "id": 2586
                    },
                    "衡东县": {
                        "id": 2587
                    },
                    "祁东县": {
                        "id": 2588
                    },
                    "耒阳市": {
                        "id": 2589
                    },
                    "常宁市": {
                        "id": 2590
                    },
                    "市辖区": {
                        "id": 4028
                    }
                }
            },
            "郴州市": {
                "id": 281,
                    "areasArr": [
                    "北湖区",
                    "苏仙区",
                    "桂阳县",
                    "宜章县",
                    "永兴县",
                    "嘉禾县",
                    "临武县",
                    "汝城县",
                    "桂东县",
                    "安仁县",
                    "资兴市",
                    "市辖区"
                ],
                    "areas": {
                    "北湖区": {
                        "id": 2591
                    },
                    "苏仙区": {
                        "id": 2592
                    },
                    "桂阳县": {
                        "id": 2593
                    },
                    "宜章县": {
                        "id": 2594
                    },
                    "永兴县": {
                        "id": 2595
                    },
                    "嘉禾县": {
                        "id": 2596
                    },
                    "临武县": {
                        "id": 2597
                    },
                    "汝城县": {
                        "id": 2598
                    },
                    "桂东县": {
                        "id": 2599
                    },
                    "安仁县": {
                        "id": 2600
                    },
                    "资兴市": {
                        "id": 2601
                    },
                    "市辖区": {
                        "id": 4034
                    }
                }
            },
            "常德市": {
                "id": 282,
                    "areasArr": [
                    "武陵区",
                    "鼎城区",
                    "安乡县",
                    "汉寿县",
                    "澧县",
                    "临澧县",
                    "桃源县",
                    "石门县",
                    "津市市",
                    "市辖区"
                ],
                    "areas": {
                    "武陵区": {
                        "id": 2602
                    },
                    "鼎城区": {
                        "id": 2603
                    },
                    "安乡县": {
                        "id": 2604
                    },
                    "汉寿县": {
                        "id": 2605
                    },
                    "澧县": {
                        "id": 2606
                    },
                    "临澧县": {
                        "id": 2607
                    },
                    "桃源县": {
                        "id": 2608
                    },
                    "石门县": {
                        "id": 2609
                    },
                    "津市市": {
                        "id": 2610
                    },
                    "市辖区": {
                        "id": 4031
                    }
                }
            },
            "益阳市": {
                "id": 283,
                    "areasArr": [
                    "资阳区",
                    "赫山区",
                    "南县",
                    "桃江县",
                    "安化县",
                    "沅江市",
                    "市辖区"
                ],
                    "areas": {
                    "资阳区": {
                        "id": 2611
                    },
                    "赫山区": {
                        "id": 2612
                    },
                    "南县": {
                        "id": 2613
                    },
                    "桃江县": {
                        "id": 2614
                    },
                    "安化县": {
                        "id": 2615
                    },
                    "沅江市": {
                        "id": 2616
                    },
                    "市辖区": {
                        "id": 4033
                    }
                }
            },
            "娄底市": {
                "id": 284,
                    "areasArr": [
                    "娄星区",
                    "双峰县",
                    "新化县",
                    "冷水江市",
                    "涟源市",
                    "市辖区"
                ],
                    "areas": {
                    "娄星区": {
                        "id": 2617
                    },
                    "双峰县": {
                        "id": 2618
                    },
                    "新化县": {
                        "id": 2619
                    },
                    "冷水江市": {
                        "id": 2620
                    },
                    "涟源市": {
                        "id": 2621
                    },
                    "市辖区": {
                        "id": 4037
                    }
                }
            },
            "邵阳市": {
                "id": 285,
                    "areasArr": [
                    "双清区",
                    "大祥区",
                    "北塔区",
                    "邵东县",
                    "新邵县",
                    "邵阳县",
                    "隆回县",
                    "洞口县",
                    "绥宁县",
                    "新宁县",
                    "城步苗族自治县",
                    "武冈市",
                    "市辖区"
                ],
                    "areas": {
                    "双清区": {
                        "id": 2622
                    },
                    "大祥区": {
                        "id": 2623
                    },
                    "北塔区": {
                        "id": 2624
                    },
                    "邵东县": {
                        "id": 2625
                    },
                    "新邵县": {
                        "id": 2626
                    },
                    "邵阳县": {
                        "id": 2627
                    },
                    "隆回县": {
                        "id": 2628
                    },
                    "洞口县": {
                        "id": 2629
                    },
                    "绥宁县": {
                        "id": 2630
                    },
                    "新宁县": {
                        "id": 2631
                    },
                    "城步苗族自治县": {
                        "id": 2632
                    },
                    "武冈市": {
                        "id": 2633
                    },
                    "市辖区": {
                        "id": 4029
                    }
                }
            },
            "湘西土家族苗族自治州": {
                "id": 286,
                    "areasArr": [
                    "吉首市",
                    "泸溪县",
                    "凤凰县",
                    "花垣县",
                    "保靖县",
                    "古丈县",
                    "永顺县",
                    "龙山县"
                ],
                    "areas": {
                    "吉首市": {
                        "id": 2634
                    },
                    "泸溪县": {
                        "id": 2635
                    },
                    "凤凰县": {
                        "id": 2636
                    },
                    "花垣县": {
                        "id": 2637
                    },
                    "保靖县": {
                        "id": 2638
                    },
                    "古丈县": {
                        "id": 2639
                    },
                    "永顺县": {
                        "id": 2640
                    },
                    "龙山县": {
                        "id": 2641
                    }
                }
            },
            "张家界市": {
                "id": 287,
                    "areasArr": [
                    "永定区",
                    "武陵源区",
                    "慈利县",
                    "桑植县",
                    "市辖区"
                ],
                    "areas": {
                    "永定区": {
                        "id": 2642
                    },
                    "武陵源区": {
                        "id": 2643
                    },
                    "慈利县": {
                        "id": 2644
                    },
                    "桑植县": {
                        "id": 2645
                    },
                    "市辖区": {
                        "id": 4032
                    }
                }
            },
            "怀化市": {
                "id": 288,
                    "areasArr": [
                    "鹤城区",
                    "中方县",
                    "沅陵县",
                    "辰溪县",
                    "溆浦县",
                    "会同县",
                    "麻阳苗族自治县",
                    "新晃侗族自治县",
                    "芷江侗族自治县",
                    "靖州苗族侗族自治县",
                    "通道侗族自治县",
                    "洪江市",
                    "市辖区"
                ],
                    "areas": {
                    "鹤城区": {
                        "id": 2646
                    },
                    "中方县": {
                        "id": 2647
                    },
                    "沅陵县": {
                        "id": 2648
                    },
                    "辰溪县": {
                        "id": 2649
                    },
                    "溆浦县": {
                        "id": 2650
                    },
                    "会同县": {
                        "id": 2651
                    },
                    "麻阳苗族自治县": {
                        "id": 2652
                    },
                    "新晃侗族自治县": {
                        "id": 2653
                    },
                    "芷江侗族自治县": {
                        "id": 2654
                    },
                    "靖州苗族侗族自治县": {
                        "id": 2655
                    },
                    "通道侗族自治县": {
                        "id": 2656
                    },
                    "洪江市": {
                        "id": 2657
                    },
                    "市辖区": {
                        "id": 4036
                    }
                }
            },
            "永州市": {
                "id": 289,
                    "areasArr": [
                    "零陵区",
                    "冷水滩区",
                    "祁阳县",
                    "东安县",
                    "双牌县",
                    "道县",
                    "江永县",
                    "宁远县",
                    "蓝山县",
                    "新田县",
                    "江华瑶族自治县",
                    "市辖区"
                ],
                    "areas": {
                    "零陵区": {
                        "id": 2658
                    },
                    "冷水滩区": {
                        "id": 2659
                    },
                    "祁阳县": {
                        "id": 2660
                    },
                    "东安县": {
                        "id": 2661
                    },
                    "双牌县": {
                        "id": 2662
                    },
                    "道县": {
                        "id": 2663
                    },
                    "江永县": {
                        "id": 2664
                    },
                    "宁远县": {
                        "id": 2665
                    },
                    "蓝山县": {
                        "id": 2666
                    },
                    "新田县": {
                        "id": 2667
                    },
                    "江华瑶族自治县": {
                        "id": 2668
                    },
                    "市辖区": {
                        "id": 4035
                    }
                }
            }
        }
    },
    "广东省": {
        "id": 29,
            "citiesArr": [
            "广州市",
            "汕尾市",
            "阳江市",
            "揭阳市",
            "茂名市",
            "惠州市",
            "江门市",
            "韶关市",
            "梅州市",
            "汕头市",
            "深圳市",
            "珠海市",
            "佛山市",
            "肇庆市",
            "湛江市",
            "中山市",
            "河源市",
            "清远市",
            "云浮市",
            "潮州市",
            "东莞市"
        ],
            "cities": {
            "广州市": {
                "id": 290,
                    "areasArr": [
                    "从化市",
                    "荔湾区",
                    "越秀区",
                    "海珠区",
                    "天河区",
                    "白云区",
                    "花都区",
                    "黄埔区",
                    "萝岗区",
                    "南沙区",
                    "番禺区",
                    "增城市",
                    "市辖区"
                ],
                    "areas": {
                    "从化市": {
                        "id": 2669
                    },
                    "荔湾区": {
                        "id": 2670
                    },
                    "越秀区": {
                        "id": 2671
                    },
                    "海珠区": {
                        "id": 2672
                    },
                    "天河区": {
                        "id": 2673
                    },
                    "白云区": {
                        "id": 2674
                    },
                    "花都区": {
                        "id": 2675
                    },
                    "黄埔区": {
                        "id": 2676
                    },
                    "萝岗区": {
                        "id": 2677
                    },
                    "南沙区": {
                        "id": 2678
                    },
                    "番禺区": {
                        "id": 2679
                    },
                    "增城市": {
                        "id": 2680
                    },
                    "市辖区": {
                        "id": 4038
                    }
                }
            },
            "汕尾市": {
                "id": 291,
                    "areasArr": [
                    "海丰县",
                    "陆河县",
                    "陆丰市",
                    "市辖区",
                    "城区"
                ],
                    "areas": {
                    "海丰县": {
                        "id": 2681
                    },
                    "陆河县": {
                        "id": 2682
                    },
                    "陆丰市": {
                        "id": 2683
                    },
                    "市辖区": {
                        "id": 4050
                    },
                    "城区": {
                        "id": 4146
                    }
                }
            },
            "阳江市": {
                "id": 292,
                    "areasArr": [
                    "江城区",
                    "阳西县",
                    "阳东县",
                    "阳春市",
                    "市辖区"
                ],
                    "areas": {
                    "江城区": {
                        "id": 2684
                    },
                    "阳西县": {
                        "id": 2685
                    },
                    "阳东县": {
                        "id": 2686
                    },
                    "阳春市": {
                        "id": 2687
                    },
                    "市辖区": {
                        "id": 4052
                    }
                }
            },
            "揭阳市": {
                "id": 293,
                    "areasArr": [
                    "榕城区",
                    "揭东县",
                    "揭西县",
                    "惠来县",
                    "普宁市",
                    "市辖区"
                ],
                    "areas": {
                    "榕城区": {
                        "id": 2688
                    },
                    "揭东县": {
                        "id": 2689
                    },
                    "揭西县": {
                        "id": 2690
                    },
                    "惠来县": {
                        "id": 2691
                    },
                    "普宁市": {
                        "id": 2692
                    },
                    "市辖区": {
                        "id": 4055
                    }
                }
            },
            "茂名市": {
                "id": 294,
                    "areasArr": [
                    "茂南区",
                    "茂港区",
                    "电白县",
                    "高州市",
                    "化州市",
                    "信宜市",
                    "市辖区"
                ],
                    "areas": {
                    "茂南区": {
                        "id": 2693
                    },
                    "茂港区": {
                        "id": 2694
                    },
                    "电白县": {
                        "id": 2695
                    },
                    "高州市": {
                        "id": 2696
                    },
                    "化州市": {
                        "id": 2697
                    },
                    "信宜市": {
                        "id": 2698
                    },
                    "市辖区": {
                        "id": 4046
                    }
                }
            },
            "惠州市": {
                "id": 295,
                    "areasArr": [
                    "惠城区",
                    "惠阳区",
                    "博罗县",
                    "惠东县",
                    "龙门县",
                    "市辖区"
                ],
                    "areas": {
                    "惠城区": {
                        "id": 2699
                    },
                    "惠阳区": {
                        "id": 2700
                    },
                    "博罗县": {
                        "id": 2701
                    },
                    "惠东县": {
                        "id": 2702
                    },
                    "龙门县": {
                        "id": 2703
                    },
                    "市辖区": {
                        "id": 4048
                    }
                }
            },
            "江门市": {
                "id": 296,
                    "areasArr": [
                    "蓬江区",
                    "江海区",
                    "新会区",
                    "台山市",
                    "开平市",
                    "鹤山市",
                    "恩平市",
                    "市辖区"
                ],
                    "areas": {
                    "蓬江区": {
                        "id": 2704
                    },
                    "江海区": {
                        "id": 2705
                    },
                    "新会区": {
                        "id": 2706
                    },
                    "台山市": {
                        "id": 2707
                    },
                    "开平市": {
                        "id": 2708
                    },
                    "鹤山市": {
                        "id": 2709
                    },
                    "恩平市": {
                        "id": 2710
                    },
                    "市辖区": {
                        "id": 4044
                    }
                }
            },
            "韶关市": {
                "id": 297,
                    "areasArr": [
                    "武江区",
                    "浈江区",
                    "曲江区",
                    "始兴县",
                    "仁化县",
                    "翁源县",
                    "乳源瑶族自治县",
                    "新丰县",
                    "乐昌市",
                    "南雄市",
                    "市辖区"
                ],
                    "areas": {
                    "武江区": {
                        "id": 2711
                    },
                    "浈江区": {
                        "id": 2712
                    },
                    "曲江区": {
                        "id": 2713
                    },
                    "始兴县": {
                        "id": 2714
                    },
                    "仁化县": {
                        "id": 2715
                    },
                    "翁源县": {
                        "id": 2716
                    },
                    "乳源瑶族自治县": {
                        "id": 2717
                    },
                    "新丰县": {
                        "id": 2718
                    },
                    "乐昌市": {
                        "id": 2719
                    },
                    "南雄市": {
                        "id": 2720
                    },
                    "市辖区": {
                        "id": 4039
                    }
                }
            },
            "梅州市": {
                "id": 298,
                    "areasArr": [
                    "梅江区",
                    "梅县",
                    "大埔县",
                    "丰顺县",
                    "五华县",
                    "平远县",
                    "蕉岭县",
                    "兴宁市",
                    "市辖区"
                ],
                    "areas": {
                    "梅江区": {
                        "id": 2721
                    },
                    "梅县": {
                        "id": 2722
                    },
                    "大埔县": {
                        "id": 2723
                    },
                    "丰顺县": {
                        "id": 2724
                    },
                    "五华县": {
                        "id": 2725
                    },
                    "平远县": {
                        "id": 2726
                    },
                    "蕉岭县": {
                        "id": 2727
                    },
                    "兴宁市": {
                        "id": 2728
                    },
                    "市辖区": {
                        "id": 4049
                    }
                }
            },
            "汕头市": {
                "id": 299,
                    "areasArr": [
                    "龙湖区",
                    "金平区",
                    "濠江区",
                    "潮阳区",
                    "潮南区",
                    "澄海区",
                    "南澳县",
                    "市辖区"
                ],
                    "areas": {
                    "龙湖区": {
                        "id": 2729
                    },
                    "金平区": {
                        "id": 2730
                    },
                    "濠江区": {
                        "id": 2731
                    },
                    "潮阳区": {
                        "id": 2732
                    },
                    "潮南区": {
                        "id": 2733
                    },
                    "澄海区": {
                        "id": 2734
                    },
                    "南澳县": {
                        "id": 2735
                    },
                    "市辖区": {
                        "id": 4042
                    }
                }
            },
            "深圳市": {
                "id": 300,
                    "areasArr": [
                    "罗湖区",
                    "福田区",
                    "南山区",
                    "宝安区",
                    "龙岗区",
                    "盐田区",
                    "龙华区",
                    "市辖区"
                ],
                    "areas": {
                    "罗湖区": {
                        "id": 2736
                    },
                    "福田区": {
                        "id": 2737
                    },
                    "南山区": {
                        "id": 2738
                    },
                    "宝安区": {
                        "id": 2739
                    },
                    "龙岗区": {
                        "id": 2740
                    },
                    "盐田区": {
                        "id": 2741
                    },
                    "龙华区": {
                        "id": 2742
                    },
                    "市辖区": {
                        "id": 4040
                    }
                }
            },
            "珠海市": {
                "id": 301,
                    "areasArr": [
                    "香洲区",
                    "斗门区",
                    "金湾区",
                    "市辖区"
                ],
                    "areas": {
                    "香洲区": {
                        "id": 2742
                    },
                    "斗门区": {
                        "id": 2743
                    },
                    "金湾区": {
                        "id": 2744
                    },
                    "市辖区": {
                        "id": 4041
                    }
                }
            },
            "佛山市": {
                "id": 302,
                    "areasArr": [
                    "禅城区",
                    "南海区",
                    "顺德区",
                    "三水区",
                    "高明区",
                    "市辖区"
                ],
                    "areas": {
                    "禅城区": {
                        "id": 2745
                    },
                    "南海区": {
                        "id": 2746
                    },
                    "顺德区": {
                        "id": 2747
                    },
                    "三水区": {
                        "id": 2748
                    },
                    "高明区": {
                        "id": 2749
                    },
                    "市辖区": {
                        "id": 4043
                    }
                }
            },
            "肇庆市": {
                "id": 303,
                    "areasArr": [
                    "端州区",
                    "鼎湖区",
                    "广宁县",
                    "怀集县",
                    "封开县",
                    "德庆县",
                    "高要市",
                    "四会市",
                    "市辖区"
                ],
                    "areas": {
                    "端州区": {
                        "id": 2750
                    },
                    "鼎湖区": {
                        "id": 2751
                    },
                    "广宁县": {
                        "id": 2752
                    },
                    "怀集县": {
                        "id": 2753
                    },
                    "封开县": {
                        "id": 2754
                    },
                    "德庆县": {
                        "id": 2755
                    },
                    "高要市": {
                        "id": 2756
                    },
                    "四会市": {
                        "id": 2757
                    },
                    "市辖区": {
                        "id": 4047
                    }
                }
            },
            "湛江市": {
                "id": 304,
                    "areasArr": [
                    "赤坎区",
                    "霞山区",
                    "坡头区",
                    "麻章区",
                    "遂溪县",
                    "徐闻县",
                    "廉江市",
                    "雷州市",
                    "吴川市",
                    "市辖区"
                ],
                    "areas": {
                    "赤坎区": {
                        "id": 2758
                    },
                    "霞山区": {
                        "id": 2759
                    },
                    "坡头区": {
                        "id": 2760
                    },
                    "麻章区": {
                        "id": 2761
                    },
                    "遂溪县": {
                        "id": 2762
                    },
                    "徐闻县": {
                        "id": 2763
                    },
                    "廉江市": {
                        "id": 2764
                    },
                    "雷州市": {
                        "id": 2765
                    },
                    "吴川市": {
                        "id": 2766
                    },
                    "市辖区": {
                        "id": 4045
                    }
                }
            },
            "中山市": {
                "id": 305,
                    "areasArr": [],
                    "areas": {}
            },
            "河源市": {
                "id": 306,
                    "areasArr": [
                    "源城区",
                    "紫金县",
                    "龙川县",
                    "连平县",
                    "和平县",
                    "东源县",
                    "市辖区"
                ],
                    "areas": {
                    "源城区": {
                        "id": 2767
                    },
                    "紫金县": {
                        "id": 2768
                    },
                    "龙川县": {
                        "id": 2769
                    },
                    "连平县": {
                        "id": 2770
                    },
                    "和平县": {
                        "id": 2771
                    },
                    "东源县": {
                        "id": 2772
                    },
                    "市辖区": {
                        "id": 4051
                    }
                }
            },
            "清远市": {
                "id": 307,
                    "areasArr": [
                    "清城区",
                    "佛冈县",
                    "阳山县",
                    "连山壮族瑶族自治县",
                    "连南瑶族自治县",
                    "清新县",
                    "英德市",
                    "连州市",
                    "市辖区"
                ],
                    "areas": {
                    "清城区": {
                        "id": 2773
                    },
                    "佛冈县": {
                        "id": 2774
                    },
                    "阳山县": {
                        "id": 2775
                    },
                    "连山壮族瑶族自治县": {
                        "id": 2776
                    },
                    "连南瑶族自治县": {
                        "id": 2777
                    },
                    "清新县": {
                        "id": 2778
                    },
                    "英德市": {
                        "id": 2779
                    },
                    "连州市": {
                        "id": 2780
                    },
                    "市辖区": {
                        "id": 4053
                    }
                }
            },
            "云浮市": {
                "id": 308,
                    "areasArr": [
                    "云城区",
                    "新兴县",
                    "郁南县",
                    "云安县",
                    "罗定市",
                    "市辖区"
                ],
                    "areas": {
                    "云城区": {
                        "id": 2781
                    },
                    "新兴县": {
                        "id": 2782
                    },
                    "郁南县": {
                        "id": 2783
                    },
                    "云安县": {
                        "id": 2784
                    },
                    "罗定市": {
                        "id": 2785
                    },
                    "市辖区": {
                        "id": 4056
                    }
                }
            },
            "潮州市": {
                "id": 309,
                    "areasArr": [
                    "湘桥区",
                    "潮安县",
                    "饶平县",
                    "市辖区"
                ],
                    "areas": {
                    "湘桥区": {
                        "id": 2786
                    },
                    "潮安县": {
                        "id": 2787
                    },
                    "饶平县": {
                        "id": 2788
                    },
                    "市辖区": {
                        "id": 4054
                    }
                }
            },
            "东莞市": {
                "id": 310,
                    "areasArr": [],
                    "areas": {}
            }
        }
    },
    "海南省": {
        "id": 30,
            "citiesArr": [
            "海口市",
            "三亚市",
            "省直辖县级行政区划"
        ],
            "cities": {
            "海口市": {
                "id": 355,
                    "areasArr": [
                    "秀英区",
                    "龙华区",
                    "琼山区",
                    "美兰区",
                    "市辖区"
                ],
                    "areas": {
                    "秀英区": {
                        "id": 3144
                    },
                    "龙华区": {
                        "id": 3145
                    },
                    "琼山区": {
                        "id": 3146
                    },
                    "美兰区": {
                        "id": 3147
                    },
                    "市辖区": {
                        "id": 4071
                    }
                }
            },
            "三亚市": {
                "id": 356,
                    "areasArr": [
                    "市辖区"
                ],
                    "areas": {
                    "市辖区": {
                        "id": 4072
                    }
                }
            },
            "省直辖县级行政区划": {
                "id": 357,
                    "areasArr": [
                    "五指山市",
                    "琼海市",
                    "儋州市",
                    "文昌市",
                    "万宁市",
                    "东方市",
                    "定安县",
                    "屯昌县",
                    "澄迈县",
                    "临高县",
                    "白沙黎族自治县",
                    "昌江黎族自治县",
                    "乐东黎族自治县",
                    "陵水黎族自治县",
                    "保亭黎族苗族自治县",
                    "琼中黎族苗族自治县",
                    "西沙群岛",
                    "南沙群岛",
                    "中沙群岛的岛礁及其海域"
                ],
                    "areas": {
                    "五指山市": {
                        "id": 3829
                    },
                    "琼海市": {
                        "id": 3830
                    },
                    "儋州市": {
                        "id": 3831
                    },
                    "文昌市": {
                        "id": 3832
                    },
                    "万宁市": {
                        "id": 3833
                    },
                    "东方市": {
                        "id": 3834
                    },
                    "定安县": {
                        "id": 3835
                    },
                    "屯昌县": {
                        "id": 3836
                    },
                    "澄迈县": {
                        "id": 3837
                    },
                    "临高县": {
                        "id": 3838
                    },
                    "白沙黎族自治县": {
                        "id": 3839
                    },
                    "昌江黎族自治县": {
                        "id": 3840
                    },
                    "乐东黎族自治县": {
                        "id": 3841
                    },
                    "陵水黎族自治县": {
                        "id": 3842
                    },
                    "保亭黎族苗族自治县": {
                        "id": 3843
                    },
                    "琼中黎族苗族自治县": {
                        "id": 3844
                    },
                    "西沙群岛": {
                        "id": 4147
                    },
                    "南沙群岛": {
                        "id": 4148
                    },
                    "中沙群岛的岛礁及其海域": {
                        "id": 4149
                    }
                }
            }
        }
    },
    "广西壮族自治区": {
        "id": 31,
            "citiesArr": [
            "防城港市",
            "南宁市",
            "崇左市",
            "来宾市",
            "柳州市",
            "桂林市",
            "梧州市",
            "贺州市",
            "贵港市",
            "玉林市",
            "百色市",
            "钦州市",
            "河池市",
            "北海市"
        ],
            "cities": {
            "防城港市": {
                "id": 407,
                    "areasArr": [
                    "港口区",
                    "防城区",
                    "上思县",
                    "东兴市",
                    "市辖区"
                ],
                    "areas": {
                    "港口区": {
                        "id": 3427
                    },
                    "防城区": {
                        "id": 3428
                    },
                    "上思县": {
                        "id": 3429
                    },
                    "东兴市": {
                        "id": 3430
                    },
                    "市辖区": {
                        "id": 4062
                    }
                }
            },
            "南宁市": {
                "id": 408,
                    "areasArr": [
                    "兴宁区",
                    "青秀区",
                    "江南区",
                    "西乡塘区",
                    "良庆区",
                    "邕宁区",
                    "武鸣县",
                    "隆安县",
                    "马山县",
                    "上林县",
                    "宾阳县",
                    "横县",
                    "市辖区"
                ],
                    "areas": {
                    "兴宁区": {
                        "id": 3431
                    },
                    "青秀区": {
                        "id": 3432
                    },
                    "江南区": {
                        "id": 3433
                    },
                    "西乡塘区": {
                        "id": 3434
                    },
                    "良庆区": {
                        "id": 3435
                    },
                    "邕宁区": {
                        "id": 3436
                    },
                    "武鸣县": {
                        "id": 3437
                    },
                    "隆安县": {
                        "id": 3438
                    },
                    "马山县": {
                        "id": 3439
                    },
                    "上林县": {
                        "id": 3440
                    },
                    "宾阳县": {
                        "id": 3441
                    },
                    "横县": {
                        "id": 3442
                    },
                    "市辖区": {
                        "id": 4057
                    }
                }
            },
            "崇左市": {
                "id": 409,
                    "areasArr": [
                    "江洲区",
                    "扶绥县",
                    "宁明县",
                    "龙州县",
                    "大新县",
                    "天等县",
                    "凭祥市",
                    "市辖区"
                ],
                    "areas": {
                    "江洲区": {
                        "id": 3443
                    },
                    "扶绥县": {
                        "id": 3444
                    },
                    "宁明县": {
                        "id": 3445
                    },
                    "龙州县": {
                        "id": 3446
                    },
                    "大新县": {
                        "id": 3447
                    },
                    "天等县": {
                        "id": 3448
                    },
                    "凭祥市": {
                        "id": 3449
                    },
                    "市辖区": {
                        "id": 4070
                    }
                }
            },
            "来宾市": {
                "id": 410,
                    "areasArr": [
                    "兴宾区",
                    "忻城县",
                    "象州县",
                    "武宣县",
                    "金秀瑶族自治县",
                    "合山市",
                    "市辖区"
                ],
                    "areas": {
                    "兴宾区": {
                        "id": 3450
                    },
                    "忻城县": {
                        "id": 3451
                    },
                    "象州县": {
                        "id": 3452
                    },
                    "武宣县": {
                        "id": 3453
                    },
                    "金秀瑶族自治县": {
                        "id": 3454
                    },
                    "合山市": {
                        "id": 3455
                    },
                    "市辖区": {
                        "id": 4069
                    }
                }
            },
            "柳州市": {
                "id": 411,
                    "areasArr": [
                    "城中区",
                    "鱼峰区",
                    "柳南区",
                    "柳北区",
                    "柳江县",
                    "柳城县",
                    "鹿寨县",
                    "融安县",
                    "融水苗族自治县",
                    "三江侗族自治县",
                    "市辖区"
                ],
                    "areas": {
                    "城中区": {
                        "id": 3456
                    },
                    "鱼峰区": {
                        "id": 3457
                    },
                    "柳南区": {
                        "id": 3458
                    },
                    "柳北区": {
                        "id": 3459
                    },
                    "柳江县": {
                        "id": 3460
                    },
                    "柳城县": {
                        "id": 3461
                    },
                    "鹿寨县": {
                        "id": 3462
                    },
                    "融安县": {
                        "id": 3463
                    },
                    "融水苗族自治县": {
                        "id": 3464
                    },
                    "三江侗族自治县": {
                        "id": 3465
                    },
                    "市辖区": {
                        "id": 4058
                    }
                }
            },
            "桂林市": {
                "id": 412,
                    "areasArr": [
                    "秀峰区",
                    "叠彩区",
                    "象山区",
                    "七星区",
                    "雁山区",
                    "阳朔县",
                    "临桂县",
                    "灵川县",
                    "全州县",
                    "兴安县",
                    "永福县",
                    "灌阳县",
                    "龙胜各族自治县",
                    "资源县",
                    "平乐县",
                    "荔浦县",
                    "恭城瑶族自治县",
                    "市辖区"
                ],
                    "areas": {
                    "秀峰区": {
                        "id": 3466
                    },
                    "叠彩区": {
                        "id": 3467
                    },
                    "象山区": {
                        "id": 3468
                    },
                    "七星区": {
                        "id": 3469
                    },
                    "雁山区": {
                        "id": 3470
                    },
                    "阳朔县": {
                        "id": 3471
                    },
                    "临桂县": {
                        "id": 3472
                    },
                    "灵川县": {
                        "id": 3473
                    },
                    "全州县": {
                        "id": 3474
                    },
                    "兴安县": {
                        "id": 3475
                    },
                    "永福县": {
                        "id": 3476
                    },
                    "灌阳县": {
                        "id": 3477
                    },
                    "龙胜各族自治县": {
                        "id": 3478
                    },
                    "资源县": {
                        "id": 3479
                    },
                    "平乐县": {
                        "id": 3480
                    },
                    "荔浦县": {
                        "id": 3481
                    },
                    "恭城瑶族自治县": {
                        "id": 3482
                    },
                    "市辖区": {
                        "id": 4059
                    }
                }
            },
            "梧州市": {
                "id": 413,
                    "areasArr": [
                    "万秀区",
                    "碟山区",
                    "长洲区",
                    "苍梧县",
                    "藤县",
                    "蒙山县",
                    "岑溪市",
                    "市辖区"
                ],
                    "areas": {
                    "万秀区": {
                        "id": 3483
                    },
                    "碟山区": {
                        "id": 3484
                    },
                    "长洲区": {
                        "id": 3485
                    },
                    "苍梧县": {
                        "id": 3486
                    },
                    "藤县": {
                        "id": 3487
                    },
                    "蒙山县": {
                        "id": 3488
                    },
                    "岑溪市": {
                        "id": 3489
                    },
                    "市辖区": {
                        "id": 4060
                    }
                }
            },
            "贺州市": {
                "id": 414,
                    "areasArr": [
                    "八步区",
                    "昭平县",
                    "钟山县",
                    "富川瑶族自治县",
                    "市辖区"
                ],
                    "areas": {
                    "八步区": {
                        "id": 3490
                    },
                    "昭平县": {
                        "id": 3491
                    },
                    "钟山县": {
                        "id": 3492
                    },
                    "富川瑶族自治县": {
                        "id": 3493
                    },
                    "市辖区": {
                        "id": 4067
                    }
                }
            },
            "贵港市": {
                "id": 415,
                    "areasArr": [
                    "港北区",
                    "港南区",
                    "覃塘区",
                    "平南县",
                    "桂平市",
                    "市辖区"
                ],
                    "areas": {
                    "港北区": {
                        "id": 3494
                    },
                    "港南区": {
                        "id": 3495
                    },
                    "覃塘区": {
                        "id": 3496
                    },
                    "平南县": {
                        "id": 3497
                    },
                    "桂平市": {
                        "id": 3498
                    },
                    "市辖区": {
                        "id": 4064
                    }
                }
            },
            "玉林市": {
                "id": 416,
                    "areasArr": [
                    "玉州区",
                    "容县",
                    "陆川县",
                    "博白县",
                    "兴业县",
                    "北流市",
                    "市辖区"
                ],
                    "areas": {
                    "玉州区": {
                        "id": 3499
                    },
                    "容县": {
                        "id": 3500
                    },
                    "陆川县": {
                        "id": 3501
                    },
                    "博白县": {
                        "id": 3502
                    },
                    "兴业县": {
                        "id": 3503
                    },
                    "北流市": {
                        "id": 3504
                    },
                    "市辖区": {
                        "id": 4065
                    }
                }
            },
            "百色市": {
                "id": 417,
                    "areasArr": [
                    "右江区",
                    "田阳县",
                    "田东县",
                    "平果县",
                    "德保县",
                    "靖西县",
                    "那坡县",
                    "凌云县",
                    "乐业县",
                    "田林县",
                    "西林县",
                    "隆林各族自治县",
                    "市辖区"
                ],
                    "areas": {
                    "右江区": {
                        "id": 3505
                    },
                    "田阳县": {
                        "id": 3506
                    },
                    "田东县": {
                        "id": 3507
                    },
                    "平果县": {
                        "id": 3508
                    },
                    "德保县": {
                        "id": 3509
                    },
                    "靖西县": {
                        "id": 3510
                    },
                    "那坡县": {
                        "id": 3511
                    },
                    "凌云县": {
                        "id": 3512
                    },
                    "乐业县": {
                        "id": 3513
                    },
                    "田林县": {
                        "id": 3514
                    },
                    "西林县": {
                        "id": 3515
                    },
                    "隆林各族自治县": {
                        "id": 3516
                    },
                    "市辖区": {
                        "id": 4066
                    }
                }
            },
            "钦州市": {
                "id": 418,
                    "areasArr": [
                    "钦南区",
                    "钦北区",
                    "灵山县",
                    "浦北县",
                    "市辖区"
                ],
                    "areas": {
                    "钦南区": {
                        "id": 3517
                    },
                    "钦北区": {
                        "id": 3518
                    },
                    "灵山县": {
                        "id": 3519
                    },
                    "浦北县": {
                        "id": 3520
                    },
                    "市辖区": {
                        "id": 4063
                    }
                }
            },
            "河池市": {
                "id": 419,
                    "areasArr": [
                    "金城江区",
                    "南丹县",
                    "天峨县",
                    "凤山县",
                    "东兰县",
                    "罗城仫佬族自治县",
                    "环江毛南族自治县",
                    "巴马瑶族自治县",
                    "都安瑶族自治县",
                    "大化瑶族自治县",
                    "宜州市",
                    "市辖区"
                ],
                    "areas": {
                    "金城江区": {
                        "id": 3521
                    },
                    "南丹县": {
                        "id": 3522
                    },
                    "天峨县": {
                        "id": 3523
                    },
                    "凤山县": {
                        "id": 3524
                    },
                    "东兰县": {
                        "id": 3525
                    },
                    "罗城仫佬族自治县": {
                        "id": 3526
                    },
                    "环江毛南族自治县": {
                        "id": 3527
                    },
                    "巴马瑶族自治县": {
                        "id": 3528
                    },
                    "都安瑶族自治县": {
                        "id": 3529
                    },
                    "大化瑶族自治县": {
                        "id": 3530
                    },
                    "宜州市": {
                        "id": 3531
                    },
                    "市辖区": {
                        "id": 4068
                    }
                }
            },
            "北海市": {
                "id": 420,
                    "areasArr": [
                    "海城区",
                    "银海区",
                    "铁山港区",
                    "合浦县",
                    "市辖区"
                ],
                    "areas": {
                    "海城区": {
                        "id": 3532
                    },
                    "银海区": {
                        "id": 3533
                    },
                    "铁山港区": {
                        "id": 3534
                    },
                    "合浦县": {
                        "id": 3535
                    },
                    "市辖区": {
                        "id": 4061
                    }
                }
            }
        }
    },
    "甘肃省": {
        "id": 32,
            "citiesArr": [
            "兰州市",
            "金昌市",
            "白银市",
            "天水市",
            "嘉峪关市",
            "武威市",
            "张掖市",
            "平凉市",
            "酒泉市",
            "庆阳市",
            "定西市",
            "陇南市",
            "临夏回族自治州",
            "甘南藏族自治州"
        ],
            "cities": {
            "兰州市": {
                "id": 311,
                    "areasArr": [
                    "城关区",
                    "七里河区",
                    "西固区",
                    "安宁区",
                    "红古区",
                    "永登县",
                    "皋兰县",
                    "榆中县",
                    "市辖区"
                ],
                    "areas": {
                    "城关区": {
                        "id": 2789
                    },
                    "七里河区": {
                        "id": 2790
                    },
                    "西固区": {
                        "id": 2791
                    },
                    "安宁区": {
                        "id": 2792
                    },
                    "红古区": {
                        "id": 2793
                    },
                    "永登县": {
                        "id": 2794
                    },
                    "皋兰县": {
                        "id": 2795
                    },
                    "榆中县": {
                        "id": 2796
                    },
                    "市辖区": {
                        "id": 4113
                    }
                }
            },
            "金昌市": {
                "id": 312,
                    "areasArr": [
                    "金川区",
                    "永昌县",
                    "市辖区"
                ],
                    "areas": {
                    "金川区": {
                        "id": 2797
                    },
                    "永昌县": {
                        "id": 2798
                    },
                    "市辖区": {
                        "id": 4115
                    }
                }
            },
            "白银市": {
                "id": 313,
                    "areasArr": [
                    "白银区",
                    "平川区",
                    "靖远县",
                    "会宁县",
                    "景泰县",
                    "市辖区"
                ],
                    "areas": {
                    "白银区": {
                        "id": 2799
                    },
                    "平川区": {
                        "id": 2800
                    },
                    "靖远县": {
                        "id": 2801
                    },
                    "会宁县": {
                        "id": 2802
                    },
                    "景泰县": {
                        "id": 2803
                    },
                    "市辖区": {
                        "id": 4116
                    }
                }
            },
            "天水市": {
                "id": 314,
                    "areasArr": [
                    "秦州区",
                    "麦积区",
                    "清水县",
                    "秦安县",
                    "甘谷县",
                    "武山县",
                    "张家川回族自治县",
                    "市辖区"
                ],
                    "areas": {
                    "秦州区": {
                        "id": 2804
                    },
                    "麦积区": {
                        "id": 2805
                    },
                    "清水县": {
                        "id": 2806
                    },
                    "秦安县": {
                        "id": 2807
                    },
                    "甘谷县": {
                        "id": 2808
                    },
                    "武山县": {
                        "id": 2809
                    },
                    "张家川回族自治县": {
                        "id": 2810
                    },
                    "市辖区": {
                        "id": 4117
                    }
                }
            },
            "嘉峪关市": {
                "id": 315,
                    "areasArr": [
                    "市辖区"
                ],
                    "areas": {
                    "市辖区": {
                        "id": 4114
                    }
                }
            },
            "武威市": {
                "id": 316,
                    "areasArr": [
                    "凉州区",
                    "民勤县",
                    "古浪县",
                    "天祝藏族自治县",
                    "市辖区"
                ],
                    "areas": {
                    "凉州区": {
                        "id": 2811
                    },
                    "民勤县": {
                        "id": 2812
                    },
                    "古浪县": {
                        "id": 2813
                    },
                    "天祝藏族自治县": {
                        "id": 2814
                    },
                    "市辖区": {
                        "id": 4118
                    }
                }
            },
            "张掖市": {
                "id": 317,
                    "areasArr": [
                    "甘州区",
                    "肃南裕固族自治县",
                    "民乐县",
                    "临泽县",
                    "高台县",
                    "山丹县",
                    "市辖区"
                ],
                    "areas": {
                    "甘州区": {
                        "id": 2815
                    },
                    "肃南裕固族自治县": {
                        "id": 2816
                    },
                    "民乐县": {
                        "id": 2817
                    },
                    "临泽县": {
                        "id": 2818
                    },
                    "高台县": {
                        "id": 2819
                    },
                    "山丹县": {
                        "id": 2820
                    },
                    "市辖区": {
                        "id": 4119
                    }
                }
            },
            "平凉市": {
                "id": 318,
                    "areasArr": [
                    "崆峒区",
                    "泾川县",
                    "灵台县",
                    "崇信县",
                    "华亭县",
                    "庄浪县",
                    "静宁县",
                    "市辖区"
                ],
                    "areas": {
                    "崆峒区": {
                        "id": 2821
                    },
                    "泾川县": {
                        "id": 2822
                    },
                    "灵台县": {
                        "id": 2823
                    },
                    "崇信县": {
                        "id": 2824
                    },
                    "华亭县": {
                        "id": 2825
                    },
                    "庄浪县": {
                        "id": 2826
                    },
                    "静宁县": {
                        "id": 2827
                    },
                    "市辖区": {
                        "id": 4120
                    }
                }
            },
            "酒泉市": {
                "id": 319,
                    "areasArr": [
                    "肃州区",
                    "金塔县",
                    "瓜州县",
                    "肃北蒙古族自治县",
                    "阿克塞哈萨克族自治县",
                    "玉门市",
                    "敦煌市",
                    "市辖区"
                ],
                    "areas": {
                    "肃州区": {
                        "id": 2828
                    },
                    "金塔县": {
                        "id": 2829
                    },
                    "瓜州县": {
                        "id": 2830
                    },
                    "肃北蒙古族自治县": {
                        "id": 2831
                    },
                    "阿克塞哈萨克族自治县": {
                        "id": 2832
                    },
                    "玉门市": {
                        "id": 2833
                    },
                    "敦煌市": {
                        "id": 2834
                    },
                    "市辖区": {
                        "id": 4121
                    }
                }
            },
            "庆阳市": {
                "id": 320,
                    "areasArr": [
                    "西峰区",
                    "庆城县",
                    "环县",
                    "华池县",
                    "合水县",
                    "正宁县",
                    "宁县",
                    "镇原县",
                    "市辖区"
                ],
                    "areas": {
                    "西峰区": {
                        "id": 2835
                    },
                    "庆城县": {
                        "id": 2836
                    },
                    "环县": {
                        "id": 2837
                    },
                    "华池县": {
                        "id": 2838
                    },
                    "合水县": {
                        "id": 2839
                    },
                    "正宁县": {
                        "id": 2840
                    },
                    "宁县": {
                        "id": 2841
                    },
                    "镇原县": {
                        "id": 2842
                    },
                    "市辖区": {
                        "id": 4122
                    }
                }
            },
            "定西市": {
                "id": 321,
                    "areasArr": [
                    "安定区",
                    "通渭县",
                    "陇西县",
                    "渭源县",
                    "临洮县",
                    "漳县",
                    "岷县",
                    "市辖区"
                ],
                    "areas": {
                    "安定区": {
                        "id": 2843
                    },
                    "通渭县": {
                        "id": 2844
                    },
                    "陇西县": {
                        "id": 2845
                    },
                    "渭源县": {
                        "id": 2846
                    },
                    "临洮县": {
                        "id": 2847
                    },
                    "漳县": {
                        "id": 2848
                    },
                    "岷县": {
                        "id": 2849
                    },
                    "市辖区": {
                        "id": 4123
                    }
                }
            },
            "陇南市": {
                "id": 322,
                    "areasArr": [
                    "武都区",
                    "成县",
                    "文县",
                    "宕昌县",
                    "康县",
                    "西和县",
                    "礼县",
                    "徽县",
                    "两当县",
                    "市辖区"
                ],
                    "areas": {
                    "武都区": {
                        "id": 2850
                    },
                    "成县": {
                        "id": 2851
                    },
                    "文县": {
                        "id": 2852
                    },
                    "宕昌县": {
                        "id": 2853
                    },
                    "康县": {
                        "id": 2854
                    },
                    "西和县": {
                        "id": 2855
                    },
                    "礼县": {
                        "id": 2856
                    },
                    "徽县": {
                        "id": 2857
                    },
                    "两当县": {
                        "id": 2858
                    },
                    "市辖区": {
                        "id": 4124
                    }
                }
            },
            "临夏回族自治州": {
                "id": 323,
                    "areasArr": [
                    "临夏市",
                    "临夏县",
                    "康乐县",
                    "永靖县",
                    "广河县",
                    "和政县",
                    "东乡族自治县",
                    "积石山保安族东乡族撒拉族自治县"
                ],
                    "areas": {
                    "临夏市": {
                        "id": 2859
                    },
                    "临夏县": {
                        "id": 2860
                    },
                    "康乐县": {
                        "id": 2861
                    },
                    "永靖县": {
                        "id": 2862
                    },
                    "广河县": {
                        "id": 2863
                    },
                    "和政县": {
                        "id": 2864
                    },
                    "东乡族自治县": {
                        "id": 2865
                    },
                    "积石山保安族东乡族撒拉族自治县": {
                        "id": 2866
                    }
                }
            },
            "甘南藏族自治州": {
                "id": 324,
                    "areasArr": [
                    "合作市",
                    "临潭县",
                    "卓尼县",
                    "舟曲县",
                    "迭部县",
                    "玛曲县",
                    "碌曲县",
                    "夏河县"
                ],
                    "areas": {
                    "合作市": {
                        "id": 2867
                    },
                    "临潭县": {
                        "id": 2868
                    },
                    "卓尼县": {
                        "id": 2869
                    },
                    "舟曲县": {
                        "id": 2870
                    },
                    "迭部县": {
                        "id": 2871
                    },
                    "玛曲县": {
                        "id": 2872
                    },
                    "碌曲县": {
                        "id": 2873
                    },
                    "夏河县": {
                        "id": 2874
                    }
                }
            }
        }
    },
    "陕西省": {
        "id": 33,
            "citiesArr": [
            "西安市",
            "咸阳市",
            "延安市",
            "榆林市",
            "渭南市",
            "商洛市",
            "安康市",
            "汉中市",
            "宝鸡市",
            "铜川市"
        ],
            "cities": {
            "西安市": {
                "id": 397,
                    "areasArr": [
                    "新城区",
                    "碑林区",
                    "莲湖区",
                    "灞桥区",
                    "未央区",
                    "雁塔区",
                    "阎良区",
                    "临潼区",
                    "长安区",
                    "蓝田县",
                    "周至县",
                    "户县",
                    "高陵县",
                    "市辖区"
                ],
                    "areas": {
                    "新城区": {
                        "id": 3320
                    },
                    "碑林区": {
                        "id": 3321
                    },
                    "莲湖区": {
                        "id": 3322
                    },
                    "灞桥区": {
                        "id": 3323
                    },
                    "未央区": {
                        "id": 3324
                    },
                    "雁塔区": {
                        "id": 3325
                    },
                    "阎良区": {
                        "id": 3326
                    },
                    "临潼区": {
                        "id": 3327
                    },
                    "长安区": {
                        "id": 3328
                    },
                    "蓝田县": {
                        "id": 3329
                    },
                    "周至县": {
                        "id": 3330
                    },
                    "户县": {
                        "id": 3331
                    },
                    "高陵县": {
                        "id": 3332
                    },
                    "市辖区": {
                        "id": 4103
                    }
                }
            },
            "咸阳市": {
                "id": 398,
                    "areasArr": [
                    "秦都区",
                    "杨陵区",
                    "渭城区",
                    "三原县",
                    "泾阳县",
                    "乾县",
                    "礼泉县",
                    "永寿县",
                    "彬县",
                    "长武县",
                    "旬邑县",
                    "淳化县",
                    "武功县",
                    "兴平市",
                    "市辖区"
                ],
                    "areas": {
                    "秦都区": {
                        "id": 3333
                    },
                    "杨陵区": {
                        "id": 3334
                    },
                    "渭城区": {
                        "id": 3335
                    },
                    "三原县": {
                        "id": 3336
                    },
                    "泾阳县": {
                        "id": 3337
                    },
                    "乾县": {
                        "id": 3338
                    },
                    "礼泉县": {
                        "id": 3339
                    },
                    "永寿县": {
                        "id": 3340
                    },
                    "彬县": {
                        "id": 3341
                    },
                    "长武县": {
                        "id": 3342
                    },
                    "旬邑县": {
                        "id": 3343
                    },
                    "淳化县": {
                        "id": 3344
                    },
                    "武功县": {
                        "id": 3345
                    },
                    "兴平市": {
                        "id": 3346
                    },
                    "市辖区": {
                        "id": 4106
                    }
                }
            },
            "延安市": {
                "id": 399,
                    "areasArr": [
                    "宝塔区",
                    "延长县",
                    "延川县",
                    "子长县",
                    "安塞县",
                    "志丹县",
                    "吴起县",
                    "甘泉县",
                    "富县",
                    "洛川县",
                    "宜川县",
                    "黄龙县",
                    "黄陵县",
                    "市辖区"
                ],
                    "areas": {
                    "宝塔区": {
                        "id": 3347
                    },
                    "延长县": {
                        "id": 3348
                    },
                    "延川县": {
                        "id": 3349
                    },
                    "子长县": {
                        "id": 3350
                    },
                    "安塞县": {
                        "id": 3351
                    },
                    "志丹县": {
                        "id": 3352
                    },
                    "吴起县": {
                        "id": 3353
                    },
                    "甘泉县": {
                        "id": 3354
                    },
                    "富县": {
                        "id": 3355
                    },
                    "洛川县": {
                        "id": 3356
                    },
                    "宜川县": {
                        "id": 3357
                    },
                    "黄龙县": {
                        "id": 3358
                    },
                    "黄陵县": {
                        "id": 3359
                    },
                    "市辖区": {
                        "id": 4108
                    }
                }
            },
            "榆林市": {
                "id": 400,
                    "areasArr": [
                    "榆阳区",
                    "神木县",
                    "府谷县",
                    "横山县",
                    "靖边县",
                    "定边县",
                    "绥德县",
                    "米脂县",
                    "佳县",
                    "吴堡县",
                    "清涧县",
                    "子洲县",
                    "市辖区"
                ],
                    "areas": {
                    "榆阳区": {
                        "id": 3360
                    },
                    "神木县": {
                        "id": 3361
                    },
                    "府谷县": {
                        "id": 3362
                    },
                    "横山县": {
                        "id": 3363
                    },
                    "靖边县": {
                        "id": 3364
                    },
                    "定边县": {
                        "id": 3365
                    },
                    "绥德县": {
                        "id": 3366
                    },
                    "米脂县": {
                        "id": 3367
                    },
                    "佳县": {
                        "id": 3368
                    },
                    "吴堡县": {
                        "id": 3369
                    },
                    "清涧县": {
                        "id": 3370
                    },
                    "子洲县": {
                        "id": 3371
                    },
                    "市辖区": {
                        "id": 4110
                    }
                }
            },
            "渭南市": {
                "id": 401,
                    "areasArr": [
                    "临渭区",
                    "华县",
                    "潼关县",
                    "大荔县",
                    "合阳县",
                    "澄城县",
                    "蒲城县",
                    "白水县",
                    "富平县",
                    "韩城市",
                    "华阴市",
                    "市辖区"
                ],
                    "areas": {
                    "临渭区": {
                        "id": 3372
                    },
                    "华县": {
                        "id": 3373
                    },
                    "潼关县": {
                        "id": 3374
                    },
                    "大荔县": {
                        "id": 3375
                    },
                    "合阳县": {
                        "id": 3376
                    },
                    "澄城县": {
                        "id": 3377
                    },
                    "蒲城县": {
                        "id": 3378
                    },
                    "白水县": {
                        "id": 3379
                    },
                    "富平县": {
                        "id": 3380
                    },
                    "韩城市": {
                        "id": 3381
                    },
                    "华阴市": {
                        "id": 3382
                    },
                    "市辖区": {
                        "id": 4107
                    }
                }
            },
            "商洛市": {
                "id": 402,
                    "areasArr": [
                    "商州区",
                    "洛南县",
                    "丹凤县",
                    "商南县",
                    "山阳县",
                    "镇安县",
                    "柞水县",
                    "市辖区"
                ],
                    "areas": {
                    "商州区": {
                        "id": 3383
                    },
                    "洛南县": {
                        "id": 3384
                    },
                    "丹凤县": {
                        "id": 3385
                    },
                    "商南县": {
                        "id": 3386
                    },
                    "山阳县": {
                        "id": 3387
                    },
                    "镇安县": {
                        "id": 3388
                    },
                    "柞水县": {
                        "id": 3389
                    },
                    "市辖区": {
                        "id": 4112
                    }
                }
            },
            "安康市": {
                "id": 403,
                    "areasArr": [
                    "汉滨区",
                    "汉阴县",
                    "石泉县",
                    "宁陕县",
                    "紫阳县",
                    "岚皋县",
                    "平利县",
                    "镇坪县",
                    "旬阳县",
                    "白河县",
                    "市辖区"
                ],
                    "areas": {
                    "汉滨区": {
                        "id": 3390
                    },
                    "汉阴县": {
                        "id": 3391
                    },
                    "石泉县": {
                        "id": 3392
                    },
                    "宁陕县": {
                        "id": 3393
                    },
                    "紫阳县": {
                        "id": 3394
                    },
                    "岚皋县": {
                        "id": 3395
                    },
                    "平利县": {
                        "id": 3396
                    },
                    "镇坪县": {
                        "id": 3397
                    },
                    "旬阳县": {
                        "id": 3398
                    },
                    "白河县": {
                        "id": 3399
                    },
                    "市辖区": {
                        "id": 4111
                    }
                }
            },
            "汉中市": {
                "id": 404,
                    "areasArr": [
                    "汉台区",
                    "南郑县",
                    "城固县",
                    "洋县",
                    "西乡县",
                    "勉县",
                    "宁强县",
                    "略阳县",
                    "镇巴县",
                    "留坝县",
                    "佛坪县",
                    "市辖区"
                ],
                    "areas": {
                    "汉台区": {
                        "id": 3400
                    },
                    "南郑县": {
                        "id": 3401
                    },
                    "城固县": {
                        "id": 3402
                    },
                    "洋县": {
                        "id": 3403
                    },
                    "西乡县": {
                        "id": 3404
                    },
                    "勉县": {
                        "id": 3405
                    },
                    "宁强县": {
                        "id": 3406
                    },
                    "略阳县": {
                        "id": 3407
                    },
                    "镇巴县": {
                        "id": 3408
                    },
                    "留坝县": {
                        "id": 3409
                    },
                    "佛坪县": {
                        "id": 3410
                    },
                    "市辖区": {
                        "id": 4109
                    }
                }
            },
            "宝鸡市": {
                "id": 405,
                    "areasArr": [
                    "渭滨区",
                    "金台区",
                    "陈仓区",
                    "凤翔县",
                    "岐山县",
                    "扶风县",
                    "眉县",
                    "陇县",
                    "千阳县",
                    "麟游县",
                    "凤县",
                    "太白县",
                    "市辖区"
                ],
                    "areas": {
                    "渭滨区": {
                        "id": 3411
                    },
                    "金台区": {
                        "id": 3412
                    },
                    "陈仓区": {
                        "id": 3413
                    },
                    "凤翔县": {
                        "id": 3414
                    },
                    "岐山县": {
                        "id": 3415
                    },
                    "扶风县": {
                        "id": 3416
                    },
                    "眉县": {
                        "id": 3417
                    },
                    "陇县": {
                        "id": 3418
                    },
                    "千阳县": {
                        "id": 3419
                    },
                    "麟游县": {
                        "id": 3420
                    },
                    "凤县": {
                        "id": 3421
                    },
                    "太白县": {
                        "id": 3422
                    },
                    "市辖区": {
                        "id": 4105
                    }
                }
            },
            "铜川市": {
                "id": 406,
                    "areasArr": [
                    "王益区",
                    "印台区",
                    "耀州区",
                    "宜君县",
                    "市辖区"
                ],
                    "areas": {
                    "王益区": {
                        "id": 3423
                    },
                    "印台区": {
                        "id": 3424
                    },
                    "耀州区": {
                        "id": 3425
                    },
                    "宜君县": {
                        "id": 3426
                    },
                    "市辖区": {
                        "id": 4104
                    }
                }
            }
        }
    },
    "新疆维吾尔自治区": {
        "id": 34,
            "citiesArr": [
            "塔城地区",
            "哈密地区",
            "和田地区",
            "阿勒泰地区",
            "克孜勒苏柯尔克孜自治州",
            "博尔塔拉蒙古自治州",
            "克拉玛依市",
            "乌鲁木齐市",
            "自治区直辖县级行政区划",
            "昌吉回族自治州",
            "吐鲁番地区",
            "巴音郭楞蒙古自治州",
            "阿克苏地区",
            "喀什地区",
            "伊犁哈萨克自治州"
        ],
            "cities": {
            "塔城地区": {
                "id": 433,
                    "areasArr": [
                    "塔城市",
                    "乌苏市",
                    "额敏县",
                    "沙湾县",
                    "托里县",
                    "裕民县",
                    "和布克赛尔蒙古自治县"
                ],
                    "areas": {
                    "塔城市": {
                        "id": 3630
                    },
                    "乌苏市": {
                        "id": 3631
                    },
                    "额敏县": {
                        "id": 3632
                    },
                    "沙湾县": {
                        "id": 3633
                    },
                    "托里县": {
                        "id": 3634
                    },
                    "裕民县": {
                        "id": 3635
                    },
                    "和布克赛尔蒙古自治县": {
                        "id": 3636
                    }
                }
            },
            "哈密地区": {
                "id": 434,
                    "areasArr": [
                    "哈密市",
                    "巴里坤哈萨克自治县",
                    "伊吾县"
                ],
                    "areas": {
                    "哈密市": {
                        "id": 3637
                    },
                    "巴里坤哈萨克自治县": {
                        "id": 3638
                    },
                    "伊吾县": {
                        "id": 3639
                    }
                }
            },
            "和田地区": {
                "id": 435,
                    "areasArr": [
                    "和田市",
                    "和田县",
                    "墨玉县",
                    "皮山县",
                    "洛浦县",
                    "策勒县",
                    "于田县",
                    "民丰县"
                ],
                    "areas": {
                    "和田市": {
                        "id": 3640
                    },
                    "和田县": {
                        "id": 3641
                    },
                    "墨玉县": {
                        "id": 3642
                    },
                    "皮山县": {
                        "id": 3643
                    },
                    "洛浦县": {
                        "id": 3644
                    },
                    "策勒县": {
                        "id": 3645
                    },
                    "于田县": {
                        "id": 3646
                    },
                    "民丰县": {
                        "id": 3647
                    }
                }
            },
            "阿勒泰地区": {
                "id": 436,
                    "areasArr": [
                    "阿勒泰市",
                    "布尔津县",
                    "富蕴县",
                    "福海县",
                    "哈巴河县",
                    "青河县",
                    "吉木乃县"
                ],
                    "areas": {
                    "阿勒泰市": {
                        "id": 3648
                    },
                    "布尔津县": {
                        "id": 3649
                    },
                    "富蕴县": {
                        "id": 3650
                    },
                    "福海县": {
                        "id": 3651
                    },
                    "哈巴河县": {
                        "id": 3652
                    },
                    "青河县": {
                        "id": 3653
                    },
                    "吉木乃县": {
                        "id": 3654
                    }
                }
            },
            "克孜勒苏柯尔克孜自治州": {
                "id": 437,
                    "areasArr": [
                    "阿图什市",
                    "阿克陶县",
                    "阿合奇县",
                    "乌恰县"
                ],
                    "areas": {
                    "阿图什市": {
                        "id": 3655
                    },
                    "阿克陶县": {
                        "id": 3656
                    },
                    "阿合奇县": {
                        "id": 3657
                    },
                    "乌恰县": {
                        "id": 3658
                    }
                }
            },
            "博尔塔拉蒙古自治州": {
                "id": 438,
                    "areasArr": [
                    "博乐市",
                    "精河县",
                    "温泉县"
                ],
                    "areas": {
                    "博乐市": {
                        "id": 3659
                    },
                    "精河县": {
                        "id": 3660
                    },
                    "温泉县": {
                        "id": 3661
                    }
                }
            },
            "克拉玛依市": {
                "id": 439,
                    "areasArr": [
                    "独山子区",
                    "克拉玛依区",
                    "白碱滩区",
                    "乌尔禾区",
                    "市辖区"
                ],
                    "areas": {
                    "独山子区": {
                        "id": 3662
                    },
                    "克拉玛依区": {
                        "id": 3663
                    },
                    "白碱滩区": {
                        "id": 3664
                    },
                    "乌尔禾区": {
                        "id": 3665
                    },
                    "市辖区": {
                        "id": 4132
                    }
                }
            },
            "乌鲁木齐市": {
                "id": 440,
                    "areasArr": [
                    "天山区",
                    "沙依巴克区",
                    "新市区",
                    "水磨沟区",
                    "头屯河区",
                    "达坂城区",
                    "米东区",
                    "乌鲁木齐县",
                    "市辖区"
                ],
                    "areas": {
                    "天山区": {
                        "id": 3666
                    },
                    "沙依巴克区": {
                        "id": 3667
                    },
                    "新市区": {
                        "id": 3668
                    },
                    "水磨沟区": {
                        "id": 3669
                    },
                    "头屯河区": {
                        "id": 3670
                    },
                    "达坂城区": {
                        "id": 3671
                    },
                    "米东区": {
                        "id": 3672
                    },
                    "乌鲁木齐县": {
                        "id": 3673
                    },
                    "市辖区": {
                        "id": 4131
                    }
                }
            },
            "自治区直辖县级行政区划": {
                "id": 441,
                    "areasArr": [
                    "石河子市",
                    "阿拉尔市",
                    "图木舒克市",
                    "五家渠市"
                ],
                    "areas": {
                    "石河子市": {
                        "id": 3845
                    },
                    "阿拉尔市": {
                        "id": 3846
                    },
                    "图木舒克市": {
                        "id": 3847
                    },
                    "五家渠市": {
                        "id": 3848
                    }
                }
            },
            "昌吉回族自治州": {
                "id": 442,
                    "areasArr": [
                    "昌吉市",
                    "阜康市",
                    "呼图壁县",
                    "玛纳斯县",
                    "奇台县",
                    "吉木萨尔县",
                    "木垒哈萨克自治县"
                ],
                    "areas": {
                    "昌吉市": {
                        "id": 3674
                    },
                    "阜康市": {
                        "id": 3675
                    },
                    "呼图壁县": {
                        "id": 3676
                    },
                    "玛纳斯县": {
                        "id": 3677
                    },
                    "奇台县": {
                        "id": 3678
                    },
                    "吉木萨尔县": {
                        "id": 3679
                    },
                    "木垒哈萨克自治县": {
                        "id": 3680
                    }
                }
            },
            "吐鲁番地区": {
                "id": 444,
                    "areasArr": [
                    "吐鲁番市",
                    "鄯善县",
                    "托克逊县"
                ],
                    "areas": {
                    "吐鲁番市": {
                        "id": 3681
                    },
                    "鄯善县": {
                        "id": 3682
                    },
                    "托克逊县": {
                        "id": 3683
                    }
                }
            },
            "巴音郭楞蒙古自治州": {
                "id": 445,
                    "areasArr": [
                    "库尔勒市",
                    "轮台县",
                    "尉犁县",
                    "若羌县",
                    "且末县",
                    "焉耆回族自治县",
                    "和静县",
                    "和硕县",
                    "博湖县"
                ],
                    "areas": {
                    "库尔勒市": {
                        "id": 3684
                    },
                    "轮台县": {
                        "id": 3685
                    },
                    "尉犁县": {
                        "id": 3686
                    },
                    "若羌县": {
                        "id": 3687
                    },
                    "且末县": {
                        "id": 3688
                    },
                    "焉耆回族自治县": {
                        "id": 3689
                    },
                    "和静县": {
                        "id": 3690
                    },
                    "和硕县": {
                        "id": 3691
                    },
                    "博湖县": {
                        "id": 3692
                    }
                }
            },
            "阿克苏地区": {
                "id": 446,
                    "areasArr": [
                    "阿克苏市",
                    "温宿县",
                    "库车县",
                    "沙雅县",
                    "新和县",
                    "拜城县",
                    "乌什县",
                    "阿瓦提县",
                    "柯坪县"
                ],
                    "areas": {
                    "阿克苏市": {
                        "id": 3693
                    },
                    "温宿县": {
                        "id": 3694
                    },
                    "库车县": {
                        "id": 3695
                    },
                    "沙雅县": {
                        "id": 3696
                    },
                    "新和县": {
                        "id": 3697
                    },
                    "拜城县": {
                        "id": 3698
                    },
                    "乌什县": {
                        "id": 3699
                    },
                    "阿瓦提县": {
                        "id": 3700
                    },
                    "柯坪县": {
                        "id": 3701
                    }
                }
            },
            "喀什地区": {
                "id": 448,
                    "areasArr": [
                    "喀什市",
                    "疏附县",
                    "疏勒县",
                    "英吉沙县",
                    "泽普县",
                    "莎车县",
                    "叶城县",
                    "麦盖提县",
                    "岳普湖县",
                    "伽师县",
                    "巴楚县",
                    "塔什库尔干塔吉克自治县"
                ],
                    "areas": {
                    "喀什市": {
                        "id": 3702
                    },
                    "疏附县": {
                        "id": 3703
                    },
                    "疏勒县": {
                        "id": 3704
                    },
                    "英吉沙县": {
                        "id": 3705
                    },
                    "泽普县": {
                        "id": 3706
                    },
                    "莎车县": {
                        "id": 3707
                    },
                    "叶城县": {
                        "id": 3708
                    },
                    "麦盖提县": {
                        "id": 3709
                    },
                    "岳普湖县": {
                        "id": 3710
                    },
                    "伽师县": {
                        "id": 3711
                    },
                    "巴楚县": {
                        "id": 3712
                    },
                    "塔什库尔干塔吉克自治县": {
                        "id": 3713
                    }
                }
            },
            "伊犁哈萨克自治州": {
                "id": 450,
                    "areasArr": [
                    "伊宁市",
                    "奎屯市",
                    "伊宁县",
                    "察布查尔锡伯自治县",
                    "霍城县",
                    "巩留县",
                    "新源县",
                    "昭苏县",
                    "特克斯县",
                    "尼勒克县"
                ],
                    "areas": {
                    "伊宁市": {
                        "id": 3714
                    },
                    "奎屯市": {
                        "id": 3715
                    },
                    "伊宁县": {
                        "id": 3716
                    },
                    "察布查尔锡伯自治县": {
                        "id": 3717
                    },
                    "霍城县": {
                        "id": 3718
                    },
                    "巩留县": {
                        "id": 3719
                    },
                    "新源县": {
                        "id": 3720
                    },
                    "昭苏县": {
                        "id": 3721
                    },
                    "特克斯县": {
                        "id": 3722
                    },
                    "尼勒克县": {
                        "id": 3723
                    }
                }
            }
        }
    },
    "青海省": {
        "id": 35,
            "citiesArr": [
            "海北藏族自治州",
            "西宁市",
            "海东地区",
            "黄南藏族自治州",
            "海南藏族自治州",
            "果洛藏族自治州",
            "玉树藏族自治州",
            "海西蒙古族藏族自治州"
        ],
            "cities": {
            "海北藏族自治州": {
                "id": 389,
                    "areasArr": [
                    "门源回族自治县",
                    "祁连县",
                    "海晏县",
                    "刚察县"
                ],
                    "areas": {
                    "门源回族自治县": {
                        "id": 3277
                    },
                    "祁连县": {
                        "id": 3278
                    },
                    "海晏县": {
                        "id": 3279
                    },
                    "刚察县": {
                        "id": 3280
                    }
                }
            },
            "西宁市": {
                "id": 390,
                    "areasArr": [
                    "城东区",
                    "城中区",
                    "城西区",
                    "城北区",
                    "大通回族土族自治县",
                    "湟中县",
                    "湟源县",
                    "市辖区"
                ],
                    "areas": {
                    "城东区": {
                        "id": 3281
                    },
                    "城中区": {
                        "id": 3282
                    },
                    "城西区": {
                        "id": 3283
                    },
                    "城北区": {
                        "id": 3284
                    },
                    "大通回族土族自治县": {
                        "id": 3285
                    },
                    "湟中县": {
                        "id": 3286
                    },
                    "湟源县": {
                        "id": 3287
                    },
                    "市辖区": {
                        "id": 4125
                    }
                }
            },
            "海东地区": {
                "id": 391,
                    "areasArr": [
                    "平安县",
                    "民和回族土族自治县",
                    "乐都县",
                    "互助土族自治县",
                    "化隆回族自治县",
                    "循化撒拉族自治县"
                ],
                    "areas": {
                    "平安县": {
                        "id": 3288
                    },
                    "民和回族土族自治县": {
                        "id": 3289
                    },
                    "乐都县": {
                        "id": 3290
                    },
                    "互助土族自治县": {
                        "id": 3291
                    },
                    "化隆回族自治县": {
                        "id": 3292
                    },
                    "循化撒拉族自治县": {
                        "id": 3293
                    }
                }
            },
            "黄南藏族自治州": {
                "id": 392,
                    "areasArr": [
                    "同仁县",
                    "尖扎县",
                    "泽库县",
                    "河南蒙古族自治县"
                ],
                    "areas": {
                    "同仁县": {
                        "id": 3294
                    },
                    "尖扎县": {
                        "id": 3295
                    },
                    "泽库县": {
                        "id": 3296
                    },
                    "河南蒙古族自治县": {
                        "id": 3297
                    }
                }
            },
            "海南藏族自治州": {
                "id": 393,
                    "areasArr": [
                    "共和县",
                    "同德县",
                    "贵德县",
                    "兴海县",
                    "贵南县"
                ],
                    "areas": {
                    "共和县": {
                        "id": 3298
                    },
                    "同德县": {
                        "id": 3299
                    },
                    "贵德县": {
                        "id": 3300
                    },
                    "兴海县": {
                        "id": 3301
                    },
                    "贵南县": {
                        "id": 3302
                    }
                }
            },
            "果洛藏族自治州": {
                "id": 394,
                    "areasArr": [
                    "玛沁县",
                    "班玛县",
                    "甘德县",
                    "达日县",
                    "久治县",
                    "玛多县"
                ],
                    "areas": {
                    "玛沁县": {
                        "id": 3303
                    },
                    "班玛县": {
                        "id": 3304
                    },
                    "甘德县": {
                        "id": 3305
                    },
                    "达日县": {
                        "id": 3306
                    },
                    "久治县": {
                        "id": 3307
                    },
                    "玛多县": {
                        "id": 3308
                    }
                }
            },
            "玉树藏族自治州": {
                "id": 395,
                    "areasArr": [
                    "玉树县",
                    "杂多县",
                    "称多县",
                    "治多县",
                    "囊谦县",
                    "曲麻莱县"
                ],
                    "areas": {
                    "玉树县": {
                        "id": 3309
                    },
                    "杂多县": {
                        "id": 3310
                    },
                    "称多县": {
                        "id": 3311
                    },
                    "治多县": {
                        "id": 3312
                    },
                    "囊谦县": {
                        "id": 3313
                    },
                    "曲麻莱县": {
                        "id": 3314
                    }
                }
            },
            "海西蒙古族藏族自治州": {
                "id": 396,
                    "areasArr": [
                    "格尔木市",
                    "德令哈市",
                    "乌兰县",
                    "都兰县",
                    "天峻县"
                ],
                    "areas": {
                    "格尔木市": {
                        "id": 3315
                    },
                    "德令哈市": {
                        "id": 3316
                    },
                    "乌兰县": {
                        "id": 3317
                    },
                    "都兰县": {
                        "id": 3318
                    },
                    "天峻县": {
                        "id": 3319
                    }
                }
            }
        }
    },
    "宁夏回族自治区": {
        "id": 36,
            "citiesArr": [
            "银川市",
            "石嘴山市",
            "吴忠市",
            "固原市",
            "中卫市"
        ],
            "cities": {
            "银川市": {
                "id": 428,
                    "areasArr": [
                    "兴庆区",
                    "西夏区",
                    "金凤区",
                    "永宁县",
                    "贺兰县",
                    "灵武市",
                    "市辖区"
                ],
                    "areas": {
                    "兴庆区": {
                        "id": 3609
                    },
                    "西夏区": {
                        "id": 3610
                    },
                    "金凤区": {
                        "id": 3611
                    },
                    "永宁县": {
                        "id": 3612
                    },
                    "贺兰县": {
                        "id": 3613
                    },
                    "灵武市": {
                        "id": 3614
                    },
                    "市辖区": {
                        "id": 4126
                    }
                }
            },
            "石嘴山市": {
                "id": 429,
                    "areasArr": [
                    "大武口区",
                    "惠农区",
                    "平罗县",
                    "市辖区"
                ],
                    "areas": {
                    "大武口区": {
                        "id": 3615
                    },
                    "惠农区": {
                        "id": 3616
                    },
                    "平罗县": {
                        "id": 3617
                    },
                    "市辖区": {
                        "id": 4127
                    }
                }
            },
            "吴忠市": {
                "id": 430,
                    "areasArr": [
                    "利通区",
                    "盐池县",
                    "同心县",
                    "青铜峡市",
                    "市辖区"
                ],
                    "areas": {
                    "利通区": {
                        "id": 3618
                    },
                    "盐池县": {
                        "id": 3619
                    },
                    "同心县": {
                        "id": 3620
                    },
                    "青铜峡市": {
                        "id": 3621
                    },
                    "市辖区": {
                        "id": 4128
                    }
                }
            },
            "固原市": {
                "id": 431,
                    "areasArr": [
                    "原州区",
                    "西吉县",
                    "隆德县",
                    "泾源县",
                    "彭阳县",
                    "市辖区"
                ],
                    "areas": {
                    "原州区": {
                        "id": 3622
                    },
                    "西吉县": {
                        "id": 3623
                    },
                    "隆德县": {
                        "id": 3624
                    },
                    "泾源县": {
                        "id": 3625
                    },
                    "彭阳县": {
                        "id": 3626
                    },
                    "市辖区": {
                        "id": 4129
                    }
                }
            },
            "中卫市": {
                "id": 432,
                    "areasArr": [
                    "沙坡头区",
                    "中宁县",
                    "海原县",
                    "市辖区"
                ],
                    "areas": {
                    "沙坡头区": {
                        "id": 3627
                    },
                    "中宁县": {
                        "id": 3628
                    },
                    "海原县": {
                        "id": 3629
                    },
                    "市辖区": {
                        "id": 4130
                    }
                }
            }
        }
    },
    "重庆市": {
        "id": 37,
            "citiesArr": [
            "重庆市"
        ],
            "cities": {
            "重庆市": {
                "id": 104,
                    "areasArr": [
                    "万州区",
                    "涪陵区",
                    "渝中区",
                    "大渡口区",
                    "江北区",
                    "沙坪坝区",
                    "九龙坡区",
                    "南岸区",
                    "北碚区",
                    "万盛区",
                    "双桥区",
                    "渝北区",
                    "巴南区",
                    "黔江区",
                    "长寿区",
                    "江津区",
                    "合川区",
                    "永川区",
                    "南川区",
                    "綦江县",
                    "潼南县",
                    "铜梁县",
                    "大足县",
                    "荣昌县",
                    "璧山县",
                    "梁平县",
                    "城口县",
                    "丰都县",
                    "垫江县",
                    "武隆县",
                    "忠县",
                    "开县",
                    "云阳县",
                    "奉节县",
                    "巫山县",
                    "巫溪县",
                    "石柱土家族自治县",
                    "秀山土家族苗族自治县",
                    "酉阳土家族苗族自治县",
                    "彭水苗族土家族自治县"
                ],
                    "areas": {
                    "万州区": {
                        "id": 1056
                    },
                    "涪陵区": {
                        "id": 1057
                    },
                    "渝中区": {
                        "id": 1058
                    },
                    "大渡口区": {
                        "id": 1059
                    },
                    "江北区": {
                        "id": 1060
                    },
                    "沙坪坝区": {
                        "id": 1061
                    },
                    "九龙坡区": {
                        "id": 1062
                    },
                    "南岸区": {
                        "id": 1063
                    },
                    "北碚区": {
                        "id": 1064
                    },
                    "万盛区": {
                        "id": 1065
                    },
                    "双桥区": {
                        "id": 1066
                    },
                    "渝北区": {
                        "id": 1067
                    },
                    "巴南区": {
                        "id": 1068
                    },
                    "黔江区": {
                        "id": 1069
                    },
                    "长寿区": {
                        "id": 1070
                    },
                    "江津区": {
                        "id": 1071
                    },
                    "合川区": {
                        "id": 1072
                    },
                    "永川区": {
                        "id": 1073
                    },
                    "南川区": {
                        "id": 1074
                    },
                    "綦江县": {
                        "id": 1075
                    },
                    "潼南县": {
                        "id": 1076
                    },
                    "铜梁县": {
                        "id": 1077
                    },
                    "大足县": {
                        "id": 1078
                    },
                    "荣昌县": {
                        "id": 1079
                    },
                    "璧山县": {
                        "id": 1080
                    },
                    "梁平县": {
                        "id": 1081
                    },
                    "城口县": {
                        "id": 1082
                    },
                    "丰都县": {
                        "id": 1083
                    },
                    "垫江县": {
                        "id": 1084
                    },
                    "武隆县": {
                        "id": 1085
                    },
                    "忠县": {
                        "id": 1086
                    },
                    "开县": {
                        "id": 1087
                    },
                    "云阳县": {
                        "id": 1088
                    },
                    "奉节县": {
                        "id": 1089
                    },
                    "巫山县": {
                        "id": 1090
                    },
                    "巫溪县": {
                        "id": 1091
                    },
                    "石柱土家族自治县": {
                        "id": 1092
                    },
                    "秀山土家族苗族自治县": {
                        "id": 1093
                    },
                    "酉阳土家族苗族自治县": {
                        "id": 1094
                    },
                    "彭水苗族土家族自治县": {
                        "id": 1095
                    }
                }
            }
        }
    },
    "四川省": {
        "id": 38,
            "citiesArr": [
            "成都市",
            "攀枝花市",
            "自贡市",
            "绵阳市",
            "南充市",
            "达州市",
            "遂宁市",
            "广安市",
            "巴中市",
            "泸州市",
            "宜宾市",
            "资阳市",
            "内江市",
            "乐山市",
            "眉山市",
            "凉山彝族自治州",
            "雅安市",
            "甘孜藏族自治州",
            "阿坝藏族羌族自治州",
            "德阳市",
            "广元市"
        ],
            "cities": {
            "成都市": {
                "id": 325,
                    "areasArr": [
                    "锦江区",
                    "青羊区",
                    "金牛区",
                    "武侯区",
                    "成华区",
                    "龙泉驿区",
                    "青白江区",
                    "新都区",
                    "温江区",
                    "金堂县",
                    "双流县",
                    "郫县",
                    "大邑县",
                    "蒲江县",
                    "新津县",
                    "都江堰市",
                    "彭州市",
                    "邛崃市",
                    "崇州市",
                    "市辖区"
                ],
                    "areas": {
                    "锦江区": {
                        "id": 2875
                    },
                    "青羊区": {
                        "id": 2876
                    },
                    "金牛区": {
                        "id": 2877
                    },
                    "武侯区": {
                        "id": 2878
                    },
                    "成华区": {
                        "id": 2879
                    },
                    "龙泉驿区": {
                        "id": 2880
                    },
                    "青白江区": {
                        "id": 2881
                    },
                    "新都区": {
                        "id": 2882
                    },
                    "温江区": {
                        "id": 2883
                    },
                    "金堂县": {
                        "id": 2884
                    },
                    "双流县": {
                        "id": 2885
                    },
                    "郫县": {
                        "id": 2886
                    },
                    "大邑县": {
                        "id": 2887
                    },
                    "蒲江县": {
                        "id": 2888
                    },
                    "新津县": {
                        "id": 2889
                    },
                    "都江堰市": {
                        "id": 2890
                    },
                    "彭州市": {
                        "id": 2891
                    },
                    "邛崃市": {
                        "id": 2892
                    },
                    "崇州市": {
                        "id": 2893
                    },
                    "市辖区": {
                        "id": 4073
                    }
                }
            },
            "攀枝花市": {
                "id": 326,
                    "areasArr": [
                    "东区",
                    "西区",
                    "仁和区",
                    "米易县",
                    "盐边县",
                    "市辖区"
                ],
                    "areas": {
                    "东区": {
                        "id": 2894
                    },
                    "西区": {
                        "id": 2895
                    },
                    "仁和区": {
                        "id": 2896
                    },
                    "米易县": {
                        "id": 2897
                    },
                    "盐边县": {
                        "id": 2898
                    },
                    "市辖区": {
                        "id": 4075
                    }
                }
            },
            "自贡市": {
                "id": 327,
                    "areasArr": [
                    "自流井区",
                    "贡井区",
                    "大安区",
                    "沿滩区",
                    "荣县",
                    "富顺县",
                    "市辖区"
                ],
                    "areas": {
                    "自流井区": {
                        "id": 2899
                    },
                    "贡井区": {
                        "id": 2900
                    },
                    "大安区": {
                        "id": 2901
                    },
                    "沿滩区": {
                        "id": 2902
                    },
                    "荣县": {
                        "id": 2903
                    },
                    "富顺县": {
                        "id": 2904
                    },
                    "市辖区": {
                        "id": 4074
                    }
                }
            },
            "绵阳市": {
                "id": 328,
                    "areasArr": [
                    "涪城区",
                    "游仙区",
                    "三台县",
                    "盐亭县",
                    "安县",
                    "梓潼县",
                    "北川羌族自治县",
                    "平武县",
                    "江油市",
                    "市辖区"
                ],
                    "areas": {
                    "涪城区": {
                        "id": 2905
                    },
                    "游仙区": {
                        "id": 2906
                    },
                    "三台县": {
                        "id": 2907
                    },
                    "盐亭县": {
                        "id": 2908
                    },
                    "安县": {
                        "id": 2909
                    },
                    "梓潼县": {
                        "id": 2910
                    },
                    "北川羌族自治县": {
                        "id": 2911
                    },
                    "平武县": {
                        "id": 2912
                    },
                    "江油市": {
                        "id": 2913
                    },
                    "市辖区": {
                        "id": 4078
                    }
                }
            },
            "南充市": {
                "id": 329,
                    "areasArr": [
                    "顺庆区",
                    "高坪区",
                    "嘉陵区",
                    "南部县",
                    "营山县",
                    "蓬安县",
                    "仪陇县",
                    "西充县",
                    "阆中市",
                    "市辖区"
                ],
                    "areas": {
                    "顺庆区": {
                        "id": 2914
                    },
                    "高坪区": {
                        "id": 2915
                    },
                    "嘉陵区": {
                        "id": 2916
                    },
                    "南部县": {
                        "id": 2917
                    },
                    "营山县": {
                        "id": 2918
                    },
                    "蓬安县": {
                        "id": 2919
                    },
                    "仪陇县": {
                        "id": 2920
                    },
                    "西充县": {
                        "id": 2921
                    },
                    "阆中市": {
                        "id": 2922
                    },
                    "市辖区": {
                        "id": 4083
                    }
                }
            },
            "达州市": {
                "id": 330,
                    "areasArr": [
                    "通川区",
                    "达县",
                    "宣汉县",
                    "开江县",
                    "大竹县",
                    "渠县",
                    "万源市",
                    "市辖区"
                ],
                    "areas": {
                    "通川区": {
                        "id": 2923
                    },
                    "达县": {
                        "id": 2924
                    },
                    "宣汉县": {
                        "id": 2925
                    },
                    "开江县": {
                        "id": 2926
                    },
                    "大竹县": {
                        "id": 2927
                    },
                    "渠县": {
                        "id": 2928
                    },
                    "万源市": {
                        "id": 2929
                    },
                    "市辖区": {
                        "id": 4087
                    }
                }
            },
            "遂宁市": {
                "id": 331,
                    "areasArr": [
                    "船山区",
                    "安居区",
                    "蓬溪县",
                    "射洪县",
                    "大英县",
                    "市辖区"
                ],
                    "areas": {
                    "船山区": {
                        "id": 2930
                    },
                    "安居区": {
                        "id": 2931
                    },
                    "蓬溪县": {
                        "id": 2932
                    },
                    "射洪县": {
                        "id": 2933
                    },
                    "大英县": {
                        "id": 2934
                    },
                    "市辖区": {
                        "id": 4080
                    }
                }
            },
            "广安市": {
                "id": 332,
                    "areasArr": [
                    "广安区",
                    "岳池县",
                    "武胜县",
                    "邻水县",
                    "华蓥市",
                    "市辖区"
                ],
                    "areas": {
                    "广安区": {
                        "id": 2935
                    },
                    "岳池县": {
                        "id": 2936
                    },
                    "武胜县": {
                        "id": 2937
                    },
                    "邻水县": {
                        "id": 2938
                    },
                    "华蓥市": {
                        "id": 2939
                    },
                    "市辖区": {
                        "id": 4086
                    }
                }
            },
            "巴中市": {
                "id": 333,
                    "areasArr": [
                    "巴州区",
                    "通江县",
                    "南江县",
                    "平昌县",
                    "市辖区"
                ],
                    "areas": {
                    "巴州区": {
                        "id": 2940
                    },
                    "通江县": {
                        "id": 2941
                    },
                    "南江县": {
                        "id": 2942
                    },
                    "平昌县": {
                        "id": 2943
                    },
                    "市辖区": {
                        "id": 4089
                    }
                }
            },
            "泸州市": {
                "id": 334,
                    "areasArr": [
                    "江阳区",
                    "纳溪区",
                    "龙马潭区",
                    "泸县",
                    "合江县",
                    "叙永县",
                    "古蔺县",
                    "市辖区"
                ],
                    "areas": {
                    "江阳区": {
                        "id": 2944
                    },
                    "纳溪区": {
                        "id": 2945
                    },
                    "龙马潭区": {
                        "id": 2946
                    },
                    "泸县": {
                        "id": 2947
                    },
                    "合江县": {
                        "id": 2948
                    },
                    "叙永县": {
                        "id": 2949
                    },
                    "古蔺县": {
                        "id": 2950
                    },
                    "市辖区": {
                        "id": 4076
                    }
                }
            },
            "宜宾市": {
                "id": 335,
                    "areasArr": [
                    "翠屏区",
                    "宜宾县",
                    "南溪县",
                    "江安县",
                    "长宁县",
                    "高县",
                    "珙县",
                    "筠连县",
                    "兴文县",
                    "屏山县",
                    "市辖区"
                ],
                    "areas": {
                    "翠屏区": {
                        "id": 2951
                    },
                    "宜宾县": {
                        "id": 2952
                    },
                    "南溪县": {
                        "id": 2953
                    },
                    "江安县": {
                        "id": 2954
                    },
                    "长宁县": {
                        "id": 2955
                    },
                    "高县": {
                        "id": 2956
                    },
                    "珙县": {
                        "id": 2957
                    },
                    "筠连县": {
                        "id": 2958
                    },
                    "兴文县": {
                        "id": 2959
                    },
                    "屏山县": {
                        "id": 2960
                    },
                    "市辖区": {
                        "id": 4085
                    }
                }
            },
            "资阳市": {
                "id": 336,
                    "areasArr": [
                    "雁江区",
                    "安岳县",
                    "乐至县",
                    "简阳市",
                    "市辖区"
                ],
                    "areas": {
                    "雁江区": {
                        "id": 2961
                    },
                    "安岳县": {
                        "id": 2962
                    },
                    "乐至县": {
                        "id": 2963
                    },
                    "简阳市": {
                        "id": 2964
                    },
                    "市辖区": {
                        "id": 4090
                    }
                }
            },
            "内江市": {
                "id": 337,
                    "areasArr": [
                    "市中区",
                    "东兴区",
                    "威远县",
                    "资中县",
                    "隆昌县",
                    "市辖区"
                ],
                    "areas": {
                    "市中区": {
                        "id": 2965
                    },
                    "东兴区": {
                        "id": 2966
                    },
                    "威远县": {
                        "id": 2967
                    },
                    "资中县": {
                        "id": 2968
                    },
                    "隆昌县": {
                        "id": 2969
                    },
                    "市辖区": {
                        "id": 4081
                    }
                }
            },
            "乐山市": {
                "id": 338,
                    "areasArr": [
                    "市中区",
                    "沙湾区",
                    "五通桥区",
                    "金口河区",
                    "犍为县",
                    "井研县",
                    "夹江县",
                    "沐川县",
                    "峨边彝族自治县",
                    "马边彝族自治县",
                    "峨眉山市",
                    "市辖区"
                ],
                    "areas": {
                    "市中区": {
                        "id": 2970
                    },
                    "沙湾区": {
                        "id": 2971
                    },
                    "五通桥区": {
                        "id": 2972
                    },
                    "金口河区": {
                        "id": 2973
                    },
                    "犍为县": {
                        "id": 2974
                    },
                    "井研县": {
                        "id": 2975
                    },
                    "夹江县": {
                        "id": 2976
                    },
                    "沐川县": {
                        "id": 2977
                    },
                    "峨边彝族自治县": {
                        "id": 2978
                    },
                    "马边彝族自治县": {
                        "id": 2979
                    },
                    "峨眉山市": {
                        "id": 2980
                    },
                    "市辖区": {
                        "id": 4082
                    }
                }
            },
            "眉山市": {
                "id": 339,
                    "areasArr": [
                    "东坡区",
                    "仁寿县",
                    "彭山县",
                    "洪雅县",
                    "丹棱县",
                    "青神县",
                    "市辖区"
                ],
                    "areas": {
                    "东坡区": {
                        "id": 2981
                    },
                    "仁寿县": {
                        "id": 2982
                    },
                    "彭山县": {
                        "id": 2983
                    },
                    "洪雅县": {
                        "id": 2984
                    },
                    "丹棱县": {
                        "id": 2985
                    },
                    "青神县": {
                        "id": 2986
                    },
                    "市辖区": {
                        "id": 4084
                    }
                }
            },
            "凉山彝族自治州": {
                "id": 340,
                    "areasArr": [
                    "西昌市",
                    "木里藏族自治县",
                    "盐源县",
                    "德昌县",
                    "会理县",
                    "会东县",
                    "宁南县",
                    "普格县",
                    "布拖县",
                    "金阳县",
                    "昭觉县",
                    "喜德县",
                    "冕宁县",
                    "越西县",
                    "甘洛县",
                    "美姑县",
                    "雷波县"
                ],
                    "areas": {
                    "西昌市": {
                        "id": 2987
                    },
                    "木里藏族自治县": {
                        "id": 2988
                    },
                    "盐源县": {
                        "id": 2989
                    },
                    "德昌县": {
                        "id": 2990
                    },
                    "会理县": {
                        "id": 2991
                    },
                    "会东县": {
                        "id": 2992
                    },
                    "宁南县": {
                        "id": 2993
                    },
                    "普格县": {
                        "id": 2994
                    },
                    "布拖县": {
                        "id": 2995
                    },
                    "金阳县": {
                        "id": 2996
                    },
                    "昭觉县": {
                        "id": 2997
                    },
                    "喜德县": {
                        "id": 2998
                    },
                    "冕宁县": {
                        "id": 2999
                    },
                    "越西县": {
                        "id": 3000
                    },
                    "甘洛县": {
                        "id": 3001
                    },
                    "美姑县": {
                        "id": 3002
                    },
                    "雷波县": {
                        "id": 3003
                    }
                }
            },
            "雅安市": {
                "id": 341,
                    "areasArr": [
                    "雨城区",
                    "名山县",
                    "荥经县",
                    "汉源县",
                    "石棉县",
                    "天全县",
                    "芦山县",
                    "宝兴县",
                    "市辖区"
                ],
                    "areas": {
                    "雨城区": {
                        "id": 3004
                    },
                    "名山县": {
                        "id": 3005
                    },
                    "荥经县": {
                        "id": 3006
                    },
                    "汉源县": {
                        "id": 3007
                    },
                    "石棉县": {
                        "id": 3008
                    },
                    "天全县": {
                        "id": 3009
                    },
                    "芦山县": {
                        "id": 3010
                    },
                    "宝兴县": {
                        "id": 3011
                    },
                    "市辖区": {
                        "id": 4088
                    }
                }
            },
            "甘孜藏族自治州": {
                "id": 342,
                    "areasArr": [
                    "康定县",
                    "泸定县",
                    "丹巴县",
                    "九龙县",
                    "雅江县",
                    "道孚县",
                    "炉霍县",
                    "甘孜县",
                    "新龙县",
                    "德格县",
                    "白玉县",
                    "石渠县",
                    "色达县",
                    "理塘县",
                    "巴塘县",
                    "乡城县",
                    "稻城县",
                    "得荣县"
                ],
                    "areas": {
                    "康定县": {
                        "id": 3012
                    },
                    "泸定县": {
                        "id": 3013
                    },
                    "丹巴县": {
                        "id": 3014
                    },
                    "九龙县": {
                        "id": 3015
                    },
                    "雅江县": {
                        "id": 3016
                    },
                    "道孚县": {
                        "id": 3017
                    },
                    "炉霍县": {
                        "id": 3018
                    },
                    "甘孜县": {
                        "id": 3019
                    },
                    "新龙县": {
                        "id": 3020
                    },
                    "德格县": {
                        "id": 3021
                    },
                    "白玉县": {
                        "id": 3022
                    },
                    "石渠县": {
                        "id": 3023
                    },
                    "色达县": {
                        "id": 3024
                    },
                    "理塘县": {
                        "id": 3025
                    },
                    "巴塘县": {
                        "id": 3026
                    },
                    "乡城县": {
                        "id": 3027
                    },
                    "稻城县": {
                        "id": 3028
                    },
                    "得荣县": {
                        "id": 3029
                    }
                }
            },
            "阿坝藏族羌族自治州": {
                "id": 343,
                    "areasArr": [
                    "汶川县",
                    "理县",
                    "茂县",
                    "松潘县",
                    "九寨沟县",
                    "金川县",
                    "小金县",
                    "黑水县",
                    "马尔康县",
                    "壤塘县",
                    "阿坝县",
                    "若尔盖县",
                    "红原县"
                ],
                    "areas": {
                    "汶川县": {
                        "id": 3030
                    },
                    "理县": {
                        "id": 3031
                    },
                    "茂县": {
                        "id": 3032
                    },
                    "松潘县": {
                        "id": 3033
                    },
                    "九寨沟县": {
                        "id": 3034
                    },
                    "金川县": {
                        "id": 3035
                    },
                    "小金县": {
                        "id": 3036
                    },
                    "黑水县": {
                        "id": 3037
                    },
                    "马尔康县": {
                        "id": 3038
                    },
                    "壤塘县": {
                        "id": 3039
                    },
                    "阿坝县": {
                        "id": 3040
                    },
                    "若尔盖县": {
                        "id": 3041
                    },
                    "红原县": {
                        "id": 3042
                    }
                }
            },
            "德阳市": {
                "id": 344,
                    "areasArr": [
                    "旌阳区",
                    "中江县",
                    "罗江县",
                    "广汉市",
                    "什邡市",
                    "绵竹市",
                    "市辖区"
                ],
                    "areas": {
                    "旌阳区": {
                        "id": 3043
                    },
                    "中江县": {
                        "id": 3044
                    },
                    "罗江县": {
                        "id": 3045
                    },
                    "广汉市": {
                        "id": 3046
                    },
                    "什邡市": {
                        "id": 3047
                    },
                    "绵竹市": {
                        "id": 3048
                    },
                    "市辖区": {
                        "id": 4077
                    }
                }
            },
            "广元市": {
                "id": 345,
                    "areasArr": [
                    "市中区",
                    "元坝区",
                    "朝天区",
                    "旺苍县",
                    "青川县",
                    "剑阁县",
                    "苍溪县",
                    "市辖区"
                ],
                    "areas": {
                    "市中区": {
                        "id": 3049
                    },
                    "元坝区": {
                        "id": 3050
                    },
                    "朝天区": {
                        "id": 3051
                    },
                    "旺苍县": {
                        "id": 3052
                    },
                    "青川县": {
                        "id": 3053
                    },
                    "剑阁县": {
                        "id": 3054
                    },
                    "苍溪县": {
                        "id": 3055
                    },
                    "市辖区": {
                        "id": 4079
                    }
                }
            }
        }
    },
    "贵州省": {
        "id": 39,
            "citiesArr": [
            "贵阳市",
            "遵义市",
            "安顺市",
            "黔南布依族苗族自治州",
            "黔东南苗族侗族自治州",
            "铜仁地区",
            "毕节地区",
            "六盘水市",
            "黔西南布依族苗族自治州"
        ],
            "cities": {
            "贵阳市": {
                "id": 346,
                    "areasArr": [
                    "南明区",
                    "云岩区",
                    "花溪区",
                    "乌当区",
                    "白云区",
                    "小河区",
                    "开阳县",
                    "息烽县",
                    "修文县",
                    "清镇市",
                    "市辖区"
                ],
                    "areas": {
                    "南明区": {
                        "id": 3056
                    },
                    "云岩区": {
                        "id": 3057
                    },
                    "花溪区": {
                        "id": 3058
                    },
                    "乌当区": {
                        "id": 3059
                    },
                    "白云区": {
                        "id": 3060
                    },
                    "小河区": {
                        "id": 3061
                    },
                    "开阳县": {
                        "id": 3062
                    },
                    "息烽县": {
                        "id": 3063
                    },
                    "修文县": {
                        "id": 3064
                    },
                    "清镇市": {
                        "id": 3065
                    },
                    "市辖区": {
                        "id": 4091
                    }
                }
            },
            "遵义市": {
                "id": 347,
                    "areasArr": [
                    "红花岗区",
                    "汇川区",
                    "遵义县",
                    "桐梓县",
                    "绥阳县",
                    "正安县",
                    "道真仡佬族苗族自治县",
                    "务川仡佬族苗族自治县",
                    "凤冈县",
                    "湄潭县",
                    "余庆县",
                    "习水县",
                    "赤水市",
                    "仁怀市",
                    "市辖区"
                ],
                    "areas": {
                    "红花岗区": {
                        "id": 3066
                    },
                    "汇川区": {
                        "id": 3067
                    },
                    "遵义县": {
                        "id": 3068
                    },
                    "桐梓县": {
                        "id": 3069
                    },
                    "绥阳县": {
                        "id": 3070
                    },
                    "正安县": {
                        "id": 3071
                    },
                    "道真仡佬族苗族自治县": {
                        "id": 3072
                    },
                    "务川仡佬族苗族自治县": {
                        "id": 3073
                    },
                    "凤冈县": {
                        "id": 3074
                    },
                    "湄潭县": {
                        "id": 3075
                    },
                    "余庆县": {
                        "id": 3076
                    },
                    "习水县": {
                        "id": 3077
                    },
                    "赤水市": {
                        "id": 3078
                    },
                    "仁怀市": {
                        "id": 3079
                    },
                    "市辖区": {
                        "id": 4092
                    }
                }
            },
            "安顺市": {
                "id": 348,
                    "areasArr": [
                    "西秀区",
                    "平坝县",
                    "普定县",
                    "镇宁布依族苗族自治县",
                    "关岭布依族苗族自治县",
                    "紫云苗族布依族自治县",
                    "市辖区"
                ],
                    "areas": {
                    "西秀区": {
                        "id": 3080
                    },
                    "平坝县": {
                        "id": 3081
                    },
                    "普定县": {
                        "id": 3082
                    },
                    "镇宁布依族苗族自治县": {
                        "id": 3083
                    },
                    "关岭布依族苗族自治县": {
                        "id": 3084
                    },
                    "紫云苗族布依族自治县": {
                        "id": 3085
                    },
                    "市辖区": {
                        "id": 4093
                    }
                }
            },
            "黔南布依族苗族自治州": {
                "id": 349,
                    "areasArr": [
                    "都匀市",
                    "福泉市",
                    "荔波县",
                    "贵定县",
                    "瓮安县",
                    "独山县",
                    "平塘县",
                    "罗甸县",
                    "长顺县",
                    "龙里县",
                    "惠水县",
                    "三都水族自治县"
                ],
                    "areas": {
                    "都匀市": {
                        "id": 3086
                    },
                    "福泉市": {
                        "id": 3087
                    },
                    "荔波县": {
                        "id": 3088
                    },
                    "贵定县": {
                        "id": 3089
                    },
                    "瓮安县": {
                        "id": 3090
                    },
                    "独山县": {
                        "id": 3091
                    },
                    "平塘县": {
                        "id": 3092
                    },
                    "罗甸县": {
                        "id": 3093
                    },
                    "长顺县": {
                        "id": 3094
                    },
                    "龙里县": {
                        "id": 3095
                    },
                    "惠水县": {
                        "id": 3096
                    },
                    "三都水族自治县": {
                        "id": 3097
                    }
                }
            },
            "黔东南苗族侗族自治州": {
                "id": 350,
                    "areasArr": [
                    "凯里市",
                    "黄平县",
                    "施秉县",
                    "三穗县",
                    "镇远县",
                    "岑巩县",
                    "天柱县",
                    "锦屏县",
                    "剑河县",
                    "台江县",
                    "黎平县",
                    "榕江县",
                    "从江县",
                    "雷山县",
                    "麻江县",
                    "丹寨县"
                ],
                    "areas": {
                    "凯里市": {
                        "id": 3098
                    },
                    "黄平县": {
                        "id": 3099
                    },
                    "施秉县": {
                        "id": 3100
                    },
                    "三穗县": {
                        "id": 3101
                    },
                    "镇远县": {
                        "id": 3102
                    },
                    "岑巩县": {
                        "id": 3103
                    },
                    "天柱县": {
                        "id": 3104
                    },
                    "锦屏县": {
                        "id": 3105
                    },
                    "剑河县": {
                        "id": 3106
                    },
                    "台江县": {
                        "id": 3107
                    },
                    "黎平县": {
                        "id": 3108
                    },
                    "榕江县": {
                        "id": 3109
                    },
                    "从江县": {
                        "id": 3110
                    },
                    "雷山县": {
                        "id": 3111
                    },
                    "麻江县": {
                        "id": 3112
                    },
                    "丹寨县": {
                        "id": 3113
                    }
                }
            },
            "铜仁地区": {
                "id": 351,
                    "areasArr": [
                    "铜仁市",
                    "江口县",
                    "玉屏侗族自治县",
                    "石阡县",
                    "思南县",
                    "印江土家族苗族自治县",
                    "德江县",
                    "沿河土家族自治县",
                    "松桃苗族自治县",
                    "万山特区"
                ],
                    "areas": {
                    "铜仁市": {
                        "id": 3114
                    },
                    "江口县": {
                        "id": 3115
                    },
                    "玉屏侗族自治县": {
                        "id": 3116
                    },
                    "石阡县": {
                        "id": 3117
                    },
                    "思南县": {
                        "id": 3118
                    },
                    "印江土家族苗族自治县": {
                        "id": 3119
                    },
                    "德江县": {
                        "id": 3120
                    },
                    "沿河土家族自治县": {
                        "id": 3121
                    },
                    "松桃苗族自治县": {
                        "id": 3122
                    },
                    "万山特区": {
                        "id": 3123
                    }
                }
            },
            "毕节地区": {
                "id": 352,
                    "areasArr": [
                    "毕节市",
                    "大方县",
                    "黔西县",
                    "金沙县",
                    "织金县",
                    "纳雍县",
                    "威宁彝族回族苗族自治县",
                    "赫章县"
                ],
                    "areas": {
                    "毕节市": {
                        "id": 3124
                    },
                    "大方县": {
                        "id": 3125
                    },
                    "黔西县": {
                        "id": 3126
                    },
                    "金沙县": {
                        "id": 3127
                    },
                    "织金县": {
                        "id": 3128
                    },
                    "纳雍县": {
                        "id": 3129
                    },
                    "威宁彝族回族苗族自治县": {
                        "id": 3130
                    },
                    "赫章县": {
                        "id": 3131
                    }
                }
            },
            "六盘水市": {
                "id": 353,
                    "areasArr": [
                    "钟山区",
                    "六枝特区",
                    "水城县",
                    "盘县"
                ],
                    "areas": {
                    "钟山区": {
                        "id": 3132
                    },
                    "六枝特区": {
                        "id": 3133
                    },
                    "水城县": {
                        "id": 3134
                    },
                    "盘县": {
                        "id": 3135
                    }
                }
            },
            "黔西南布依族苗族自治州": {
                "id": 354,
                    "areasArr": [
                    "兴义市",
                    "兴仁县",
                    "普安县",
                    "晴隆县",
                    "贞丰县",
                    "望谟县",
                    "册亨县",
                    "安龙县"
                ],
                    "areas": {
                    "兴义市": {
                        "id": 3136
                    },
                    "兴仁县": {
                        "id": 3137
                    },
                    "普安县": {
                        "id": 3138
                    },
                    "晴隆县": {
                        "id": 3139
                    },
                    "贞丰县": {
                        "id": 3140
                    },
                    "望谟县": {
                        "id": 3141
                    },
                    "册亨县": {
                        "id": 3142
                    },
                    "安龙县": {
                        "id": 3143
                    }
                }
            }
        }
    },
    "云南省": {
        "id": 40,
            "citiesArr": [
            "西双版纳傣族自治州",
            "德宏傣族景颇族自治州",
            "昭通市",
            "昆明市",
            "大理白族自治州",
            "红河哈尼族彝族自治州",
            "曲靖市",
            "保山市",
            "文山壮族苗族自治州",
            "玉溪市",
            "楚雄彝族自治州",
            "普洱市",
            "临沧市",
            "怒江傈僳族自治州",
            "迪庆藏族自治州",
            "丽江市"
        ],
            "cities": {
            "西双版纳傣族自治州": {
                "id": 373,
                    "areasArr": [
                    "景洪市",
                    "勐海县",
                    "勐腊县"
                ],
                    "areas": {
                    "景洪市": {
                        "id": 3148
                    },
                    "勐海县": {
                        "id": 3149
                    },
                    "勐腊县": {
                        "id": 3150
                    }
                }
            },
            "德宏傣族景颇族自治州": {
                "id": 374,
                    "areasArr": [
                    "瑞丽市",
                    "潞西市",
                    "梁河县",
                    "盈江县",
                    "陇川县"
                ],
                    "areas": {
                    "瑞丽市": {
                        "id": 3151
                    },
                    "潞西市": {
                        "id": 3152
                    },
                    "梁河县": {
                        "id": 3153
                    },
                    "盈江县": {
                        "id": 3154
                    },
                    "陇川县": {
                        "id": 3155
                    }
                }
            },
            "昭通市": {
                "id": 375,
                    "areasArr": [
                    "昭阳区",
                    "鲁甸县",
                    "巧家县",
                    "盐津县",
                    "大关县",
                    "永善县",
                    "绥江县",
                    "镇雄县",
                    "彝良县",
                    "威信县",
                    "水富县",
                    "市辖区"
                ],
                    "areas": {
                    "昭阳区": {
                        "id": 3156
                    },
                    "鲁甸县": {
                        "id": 3157
                    },
                    "巧家县": {
                        "id": 3158
                    },
                    "盐津县": {
                        "id": 3159
                    },
                    "大关县": {
                        "id": 3160
                    },
                    "永善县": {
                        "id": 3161
                    },
                    "绥江县": {
                        "id": 3162
                    },
                    "镇雄县": {
                        "id": 3163
                    },
                    "彝良县": {
                        "id": 3164
                    },
                    "威信县": {
                        "id": 3165
                    },
                    "水富县": {
                        "id": 3166
                    },
                    "市辖区": {
                        "id": 4098
                    }
                }
            },
            "昆明市": {
                "id": 376,
                    "areasArr": [
                    "五华区",
                    "盘龙区",
                    "官渡区",
                    "西山区",
                    "东川区",
                    "呈贡县",
                    "晋宁县",
                    "富民县",
                    "宜良县",
                    "石林彝族自治县",
                    "嵩明县",
                    "禄劝彝族苗族自治县",
                    "寻甸回族彝族自治县",
                    "安宁市",
                    "市辖区"
                ],
                    "areas": {
                    "五华区": {
                        "id": 3167
                    },
                    "盘龙区": {
                        "id": 3168
                    },
                    "官渡区": {
                        "id": 3169
                    },
                    "西山区": {
                        "id": 3170
                    },
                    "东川区": {
                        "id": 3171
                    },
                    "呈贡县": {
                        "id": 3172
                    },
                    "晋宁县": {
                        "id": 3173
                    },
                    "富民县": {
                        "id": 3174
                    },
                    "宜良县": {
                        "id": 3175
                    },
                    "石林彝族自治县": {
                        "id": 3176
                    },
                    "嵩明县": {
                        "id": 3177
                    },
                    "禄劝彝族苗族自治县": {
                        "id": 3178
                    },
                    "寻甸回族彝族自治县": {
                        "id": 3179
                    },
                    "安宁市": {
                        "id": 3180
                    },
                    "市辖区": {
                        "id": 4094
                    }
                }
            },
            "大理白族自治州": {
                "id": 377,
                    "areasArr": [
                    "大理市",
                    "漾濞彝族自治县",
                    "祥云县",
                    "宾川县",
                    "弥渡县",
                    "南涧彝族自治县",
                    "巍山彝族回族自治县",
                    "永平县",
                    "云龙县",
                    "洱源县",
                    "剑川县",
                    "鹤庆县"
                ],
                    "areas": {
                    "大理市": {
                        "id": 3181
                    },
                    "漾濞彝族自治县": {
                        "id": 3182
                    },
                    "祥云县": {
                        "id": 3183
                    },
                    "宾川县": {
                        "id": 3184
                    },
                    "弥渡县": {
                        "id": 3185
                    },
                    "南涧彝族自治县": {
                        "id": 3186
                    },
                    "巍山彝族回族自治县": {
                        "id": 3187
                    },
                    "永平县": {
                        "id": 3188
                    },
                    "云龙县": {
                        "id": 3189
                    },
                    "洱源县": {
                        "id": 3190
                    },
                    "剑川县": {
                        "id": 3191
                    },
                    "鹤庆县": {
                        "id": 3192
                    }
                }
            },
            "红河哈尼族彝族自治州": {
                "id": 378,
                    "areasArr": [
                    "个旧市",
                    "开远市",
                    "蒙自县",
                    "屏边苗族自治县",
                    "建水县",
                    "石屏县",
                    "弥勒县",
                    "泸西县",
                    "元阳县",
                    "红河县",
                    "金平苗族瑶族傣族自治县",
                    "绿春县",
                    "河口瑶族自治县"
                ],
                    "areas": {
                    "个旧市": {
                        "id": 3193
                    },
                    "开远市": {
                        "id": 3194
                    },
                    "蒙自县": {
                        "id": 3195
                    },
                    "屏边苗族自治县": {
                        "id": 3196
                    },
                    "建水县": {
                        "id": 3197
                    },
                    "石屏县": {
                        "id": 3198
                    },
                    "弥勒县": {
                        "id": 3199
                    },
                    "泸西县": {
                        "id": 3200
                    },
                    "元阳县": {
                        "id": 3201
                    },
                    "红河县": {
                        "id": 3202
                    },
                    "金平苗族瑶族傣族自治县": {
                        "id": 3203
                    },
                    "绿春县": {
                        "id": 3204
                    },
                    "河口瑶族自治县": {
                        "id": 3205
                    }
                }
            },
            "曲靖市": {
                "id": 379,
                    "areasArr": [
                    "麒麟区",
                    "马龙县",
                    "陆良县",
                    "师宗县",
                    "罗平县",
                    "富源县",
                    "会泽县",
                    "沾益县",
                    "宣威市",
                    "市辖区"
                ],
                    "areas": {
                    "麒麟区": {
                        "id": 3206
                    },
                    "马龙县": {
                        "id": 3207
                    },
                    "陆良县": {
                        "id": 3208
                    },
                    "师宗县": {
                        "id": 3209
                    },
                    "罗平县": {
                        "id": 3210
                    },
                    "富源县": {
                        "id": 3211
                    },
                    "会泽县": {
                        "id": 3212
                    },
                    "沾益县": {
                        "id": 3213
                    },
                    "宣威市": {
                        "id": 3214
                    },
                    "市辖区": {
                        "id": 4095
                    }
                }
            },
            "保山市": {
                "id": 380,
                    "areasArr": [
                    "隆阳区",
                    "施甸县",
                    "腾冲县",
                    "龙陵县",
                    "昌宁县",
                    "市辖区"
                ],
                    "areas": {
                    "隆阳区": {
                        "id": 3215
                    },
                    "施甸县": {
                        "id": 3216
                    },
                    "腾冲县": {
                        "id": 3217
                    },
                    "龙陵县": {
                        "id": 3218
                    },
                    "昌宁县": {
                        "id": 3219
                    },
                    "市辖区": {
                        "id": 4097
                    }
                }
            },
            "文山壮族苗族自治州": {
                "id": 381,
                    "areasArr": [
                    "文山县",
                    "砚山县",
                    "西畴县",
                    "麻栗坡县",
                    "马关县",
                    "丘北县",
                    "广南县",
                    "富宁县"
                ],
                    "areas": {
                    "文山县": {
                        "id": 3220
                    },
                    "砚山县": {
                        "id": 3221
                    },
                    "西畴县": {
                        "id": 3222
                    },
                    "麻栗坡县": {
                        "id": 3223
                    },
                    "马关县": {
                        "id": 3224
                    },
                    "丘北县": {
                        "id": 3225
                    },
                    "广南县": {
                        "id": 3226
                    },
                    "富宁县": {
                        "id": 3227
                    }
                }
            },
            "玉溪市": {
                "id": 382,
                    "areasArr": [
                    "红塔区",
                    "江川县",
                    "澄江县",
                    "通海县",
                    "华宁县",
                    "易门县",
                    "峨山彝族自治县",
                    "新平彝族傣族自治县",
                    "元江哈尼族彝族傣族自治县",
                    "市辖区"
                ],
                    "areas": {
                    "红塔区": {
                        "id": 3228
                    },
                    "江川县": {
                        "id": 3229
                    },
                    "澄江县": {
                        "id": 3230
                    },
                    "通海县": {
                        "id": 3231
                    },
                    "华宁县": {
                        "id": 3232
                    },
                    "易门县": {
                        "id": 3233
                    },
                    "峨山彝族自治县": {
                        "id": 3234
                    },
                    "新平彝族傣族自治县": {
                        "id": 3235
                    },
                    "元江哈尼族彝族傣族自治县": {
                        "id": 3236
                    },
                    "市辖区": {
                        "id": 4096
                    }
                }
            },
            "楚雄彝族自治州": {
                "id": 383,
                    "areasArr": [
                    "楚雄市",
                    "双柏县",
                    "牟定县",
                    "南华县",
                    "姚安县",
                    "大姚县",
                    "永仁县",
                    "元谋县",
                    "武定县",
                    "禄丰县"
                ],
                    "areas": {
                    "楚雄市": {
                        "id": 3237
                    },
                    "双柏县": {
                        "id": 3238
                    },
                    "牟定县": {
                        "id": 3239
                    },
                    "南华县": {
                        "id": 3240
                    },
                    "姚安县": {
                        "id": 3241
                    },
                    "大姚县": {
                        "id": 3242
                    },
                    "永仁县": {
                        "id": 3243
                    },
                    "元谋县": {
                        "id": 3244
                    },
                    "武定县": {
                        "id": 3245
                    },
                    "禄丰县": {
                        "id": 3246
                    }
                }
            },
            "普洱市": {
                "id": 384,
                    "areasArr": [
                    "思茅区",
                    "宁洱哈尼族彝族自治县",
                    "墨江哈尼族自治县",
                    "景东彝族自治县",
                    "景谷傣族彝族自治县",
                    "镇沅彝族哈尼族拉祜族自治县",
                    "江城哈尼族彝族自治县",
                    "孟连傣族拉祜族佤族自治县",
                    "澜沧拉祜族自治县",
                    "西盟佤族自治县",
                    "市辖区"
                ],
                    "areas": {
                    "思茅区": {
                        "id": 3247
                    },
                    "宁洱哈尼族彝族自治县": {
                        "id": 3248
                    },
                    "墨江哈尼族自治县": {
                        "id": 3249
                    },
                    "景东彝族自治县": {
                        "id": 3250
                    },
                    "景谷傣族彝族自治县": {
                        "id": 3251
                    },
                    "镇沅彝族哈尼族拉祜族自治县": {
                        "id": 3252
                    },
                    "江城哈尼族彝族自治县": {
                        "id": 3253
                    },
                    "孟连傣族拉祜族佤族自治县": {
                        "id": 3254
                    },
                    "澜沧拉祜族自治县": {
                        "id": 3255
                    },
                    "西盟佤族自治县": {
                        "id": 3256
                    },
                    "市辖区": {
                        "id": 4100
                    }
                }
            },
            "临沧市": {
                "id": 385,
                    "areasArr": [
                    "临翔区",
                    "凤庆县",
                    "云县",
                    "永德县",
                    "镇康县",
                    "双江拉祜族佤族布朗族傣族自治县",
                    "耿马傣族佤族自治县",
                    "沧源佤族自治县",
                    "市辖区"
                ],
                    "areas": {
                    "临翔区": {
                        "id": 3257
                    },
                    "凤庆县": {
                        "id": 3258
                    },
                    "云县": {
                        "id": 3259
                    },
                    "永德县": {
                        "id": 3260
                    },
                    "镇康县": {
                        "id": 3261
                    },
                    "双江拉祜族佤族布朗族傣族自治县": {
                        "id": 3262
                    },
                    "耿马傣族佤族自治县": {
                        "id": 3263
                    },
                    "沧源佤族自治县": {
                        "id": 3264
                    },
                    "市辖区": {
                        "id": 4101
                    }
                }
            },
            "怒江傈僳族自治州": {
                "id": 386,
                    "areasArr": [
                    "泸水县",
                    "福贡县",
                    "贡山独龙族怒族自治县",
                    "兰坪白族普米族自治县"
                ],
                    "areas": {
                    "泸水县": {
                        "id": 3265
                    },
                    "福贡县": {
                        "id": 3266
                    },
                    "贡山独龙族怒族自治县": {
                        "id": 3267
                    },
                    "兰坪白族普米族自治县": {
                        "id": 3268
                    }
                }
            },
            "迪庆藏族自治州": {
                "id": 387,
                    "areasArr": [
                    "香格里拉县",
                    "德钦县",
                    "维西傈僳族自治县"
                ],
                    "areas": {
                    "香格里拉县": {
                        "id": 3269
                    },
                    "德钦县": {
                        "id": 3270
                    },
                    "维西傈僳族自治县": {
                        "id": 3271
                    }
                }
            },
            "丽江市": {
                "id": 388,
                    "areasArr": [
                    "古城区",
                    "玉龙纳西族自治县",
                    "永胜县",
                    "华坪县",
                    "宁蒗彝族自治县",
                    "市辖区"
                ],
                    "areas": {
                    "古城区": {
                        "id": 3272
                    },
                    "玉龙纳西族自治县": {
                        "id": 3273
                    },
                    "永胜县": {
                        "id": 3274
                    },
                    "华坪县": {
                        "id": 3275
                    },
                    "宁蒗彝族自治县": {
                        "id": 3276
                    },
                    "市辖区": {
                        "id": 4099
                    }
                }
            }
        }
    },
    "西藏自治区": {
        "id": 41,
            "citiesArr": [
            "拉萨市",
            "日喀则地区",
            "山南地区",
            "林芝地区",
            "昌都地区",
            "那曲地区",
            "阿里地区"
        ],
            "cities": {
            "拉萨市": {
                "id": 421,
                    "areasArr": [
                    "城关区",
                    "林周县",
                    "当雄县",
                    "尼木县",
                    "曲水县",
                    "堆龙德庆县",
                    "达孜县",
                    "墨竹工卡县",
                    "市辖区"
                ],
                    "areas": {
                    "城关区": {
                        "id": 3536
                    },
                    "林周县": {
                        "id": 3537
                    },
                    "当雄县": {
                        "id": 3538
                    },
                    "尼木县": {
                        "id": 3539
                    },
                    "曲水县": {
                        "id": 3540
                    },
                    "堆龙德庆县": {
                        "id": 3541
                    },
                    "达孜县": {
                        "id": 3542
                    },
                    "墨竹工卡县": {
                        "id": 3543
                    },
                    "市辖区": {
                        "id": 4102
                    }
                }
            },
            "日喀则地区": {
                "id": 422,
                    "areasArr": [
                    "日喀则市",
                    "南木林县",
                    "江孜县",
                    "定日县",
                    "萨迦县",
                    "拉孜县",
                    "昂仁县",
                    "谢通门县",
                    "白朗县",
                    "仁布县",
                    "康马县",
                    "定结县",
                    "仲巴县",
                    "亚东县",
                    "吉隆县",
                    "聂拉木县",
                    "萨嘎县",
                    "岗巴县"
                ],
                    "areas": {
                    "日喀则市": {
                        "id": 3544
                    },
                    "南木林县": {
                        "id": 3545
                    },
                    "江孜县": {
                        "id": 3546
                    },
                    "定日县": {
                        "id": 3547
                    },
                    "萨迦县": {
                        "id": 3548
                    },
                    "拉孜县": {
                        "id": 3549
                    },
                    "昂仁县": {
                        "id": 3550
                    },
                    "谢通门县": {
                        "id": 3551
                    },
                    "白朗县": {
                        "id": 3552
                    },
                    "仁布县": {
                        "id": 3553
                    },
                    "康马县": {
                        "id": 3554
                    },
                    "定结县": {
                        "id": 3555
                    },
                    "仲巴县": {
                        "id": 3556
                    },
                    "亚东县": {
                        "id": 3557
                    },
                    "吉隆县": {
                        "id": 3558
                    },
                    "聂拉木县": {
                        "id": 3559
                    },
                    "萨嘎县": {
                        "id": 3560
                    },
                    "岗巴县": {
                        "id": 3561
                    }
                }
            },
            "山南地区": {
                "id": 423,
                    "areasArr": [
                    "乃东县",
                    "扎囊县",
                    "贡嘎县",
                    "桑日县",
                    "琼结县",
                    "曲松县",
                    "措美县",
                    "洛扎县",
                    "加查县",
                    "隆子县",
                    "错那县",
                    "浪卡子县"
                ],
                    "areas": {
                    "乃东县": {
                        "id": 3562
                    },
                    "扎囊县": {
                        "id": 3563
                    },
                    "贡嘎县": {
                        "id": 3564
                    },
                    "桑日县": {
                        "id": 3565
                    },
                    "琼结县": {
                        "id": 3566
                    },
                    "曲松县": {
                        "id": 3567
                    },
                    "措美县": {
                        "id": 3568
                    },
                    "洛扎县": {
                        "id": 3569
                    },
                    "加查县": {
                        "id": 3570
                    },
                    "隆子县": {
                        "id": 3571
                    },
                    "错那县": {
                        "id": 3572
                    },
                    "浪卡子县": {
                        "id": 3573
                    }
                }
            },
            "林芝地区": {
                "id": 424,
                    "areasArr": [
                    "林芝县",
                    "工布江达县",
                    "米林县",
                    "墨脱县",
                    "波密县",
                    "察隅县",
                    "朗县"
                ],
                    "areas": {
                    "林芝县": {
                        "id": 3574
                    },
                    "工布江达县": {
                        "id": 3575
                    },
                    "米林县": {
                        "id": 3576
                    },
                    "墨脱县": {
                        "id": 3577
                    },
                    "波密县": {
                        "id": 3578
                    },
                    "察隅县": {
                        "id": 3579
                    },
                    "朗县": {
                        "id": 3580
                    }
                }
            },
            "昌都地区": {
                "id": 425,
                    "areasArr": [
                    "昌都县",
                    "江达县",
                    "贡觉县",
                    "类乌齐县",
                    "丁青县",
                    "察雅县",
                    "八宿县",
                    "左贡县",
                    "芒康县",
                    "洛隆县",
                    "边坝县"
                ],
                    "areas": {
                    "昌都县": {
                        "id": 3581
                    },
                    "江达县": {
                        "id": 3582
                    },
                    "贡觉县": {
                        "id": 3583
                    },
                    "类乌齐县": {
                        "id": 3584
                    },
                    "丁青县": {
                        "id": 3585
                    },
                    "察雅县": {
                        "id": 3586
                    },
                    "八宿县": {
                        "id": 3587
                    },
                    "左贡县": {
                        "id": 3588
                    },
                    "芒康县": {
                        "id": 3589
                    },
                    "洛隆县": {
                        "id": 3590
                    },
                    "边坝县": {
                        "id": 3591
                    }
                }
            },
            "那曲地区": {
                "id": 426,
                    "areasArr": [
                    "那曲县",
                    "嘉黎县",
                    "比如县",
                    "聂荣县",
                    "安多县",
                    "申扎县",
                    "索县",
                    "班戈县",
                    "巴青县",
                    "尼玛县"
                ],
                    "areas": {
                    "那曲县": {
                        "id": 3592
                    },
                    "嘉黎县": {
                        "id": 3593
                    },
                    "比如县": {
                        "id": 3594
                    },
                    "聂荣县": {
                        "id": 3595
                    },
                    "安多县": {
                        "id": 3596
                    },
                    "申扎县": {
                        "id": 3597
                    },
                    "索县": {
                        "id": 3598
                    },
                    "班戈县": {
                        "id": 3599
                    },
                    "巴青县": {
                        "id": 3600
                    },
                    "尼玛县": {
                        "id": 3601
                    }
                }
            },
            "阿里地区": {
                "id": 427,
                    "areasArr": [
                    "普兰县",
                    "札达县",
                    "噶尔县",
                    "日土县",
                    "革吉县",
                    "改则县",
                    "措勤县"
                ],
                    "areas": {
                    "普兰县": {
                        "id": 3602
                    },
                    "札达县": {
                        "id": 3603
                    },
                    "噶尔县": {
                        "id": 3604
                    },
                    "日土县": {
                        "id": 3605
                    },
                    "革吉县": {
                        "id": 3606
                    },
                    "改则县": {
                        "id": 3607
                    },
                    "措勤县": {
                        "id": 3608
                    }
                }
            }
        }
     }
   }
}