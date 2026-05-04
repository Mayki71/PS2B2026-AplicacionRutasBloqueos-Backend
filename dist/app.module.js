"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const admin_module_1 = require("./modules/admin/admin.module");
const auth_module_1 = require("./modules/auth/auth.module");
const reports_module_1 = require("./modules/reports/reports.module");
const config_1 = require("@nestjs/config");
const supabase_config_1 = require("./config/supabase.config");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            reports_module_1.ReportsModule,
            admin_module_1.AdminModule,
            auth_module_1.AuthModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
const testConnection = async () => {
    try {
        const { data, error } = await supabase_config_1.supabase.from('usuarios').select('*').limit(1);
        if (error) {
            console.error('❌ Error conectando a Supabase:', error.message);
        }
        else {
            console.log('✅ Supabase conectado correctamente');
            if (data) {
                console.log(`📊 Se encontraron ${data.length} registros`);
            }
        }
    }
    catch (err) {
        if (err instanceof Error) {
            console.error('❌ Error al conectar con Supabase:', err.message);
        }
        else {
            console.error('❌ Error desconocido:', err);
        }
    }
};
testConnection();
//# sourceMappingURL=app.module.js.map