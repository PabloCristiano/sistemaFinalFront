import {
    TokenService
} from "@/services/storage.service";

const adminToken = "MODULO_GERAL";

const PermissionVerify = {
    $checkPermission(haystack = [], needle = false, autoAdminAllow = true) {
        //se a lista de permissões necessárias estiver vazia, aceitar
        if (!haystack || haystack.length === 0) return true;
        //se não explicitar a permissão, pega a do usuário logado
        if (!needle) needle = TokenService.getPermissions();
        //se o usuário tiver a permissão MODULO_GERAL, ele terá acesso a tudo
        if (needle.indexOf(adminToken) !== -1 && autoAdminAllow) return true;
        //se for passada apenas uma permissão, transforma em array
        if (!Array.isArray(haystack)) haystack = [haystack];

        return TokenService.checkPermissions(haystack, needle);
    },

    $isAdmin() {
        const perms = TokenService.getPermissions();
        return perms.indexOf(adminToken) !== -1;
    }
}

export default PermissionVerify