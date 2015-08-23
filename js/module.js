(function () {
    var moduleMap = {};

    var noop = function () {};
    window.thin = {
        /**
         * 定义模块方法
         * @param name 模块名
         * @param dependencies 模块依赖项
         * @param factory 模块创建的工厂方法
         */
        define: function (name, dependencies, factory) {
            if (!moduleMap[name]) {
                var module = {
                    name: name,
                    dependencies: dependencies,
                    factory: factory
                };
                moduleMap[name] = module;
            }
            return moduleMap[name];
        },


        use: function (name) {
            var module = moduleMap[name];
            if (!module.entity) {
                var args = [];
                for (var i = 0; i < module.dependencies.length; i++) {
                    if (moduleMap[module.dependencies[i]].entity) {
                        args.push(moduleMap[module.dependencies[i]].entity);
                    } else {
                        args.push(this.use(module.dependencies[i]));
                    }
                }
                module.entity = module.factory.apply(noop, args);
            }
            return module.entity;
        }
    }
})();