// 用于注册component的所有组件 插件
import SvgIcons from './SvgIcon/SvgIcons.vue';
import type { App, Component } from "vue";
//导入Element图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// ts语法
// [name: string]: Component 定义了任意属性取 string 类型的值
const components: { [name: string]: Component } = {
    SvgIcons,
};
// 对外暴露插件对象
export default {
    install(app: App) {
        Object.keys(components).forEach((key: string) => {
            const component = components[key];
            // 如果组件存在
            if (component) {
                app.component(key, component);
            }
        });
        // 全局注册图标组件
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }
    },
};