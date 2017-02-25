const gulp = require('gulp');
const gulp_sequence = require('gulp-sequence');
const dir_glob = require('glob')
const fs_extra = require('fs-extra')
const jsonfile = require('jsonfile');

const _config_obj = {
    "template_config_path": [__dirname, 'webapp_template', 'template_config'].join('/')
}

gulp.task('template_config', () => {
    WebappTemplateHelpper.update_config_json();
});

gulp.task('default', gulp_sequence(['template_config']));
// gulp.task('default', gulp_sequence(['hi']));

class WebappTemplateHelpper {
    static update_config_json() {
        const config_file_array = _get_config_file_array();

        _create_config_json_file(config_file_array);

        function _create_config_json_file(config_file_array) {
            const target_file = [_config_obj.template_config_path, '_webapp_template_config.json'].join('/');
            let result_config_obj = {};

            config_file_array.forEach((config_file) => {
                const config_json = jsonfile.readFileSync(config_file);
                const name_key = config_json.name_key;
                console.log(name_key);
                if (name_key) {
                    result_config_obj[name_key] = config_json;
                }
            });

            fs_extra.remove(target_file, (err) => {
                if (!err) {
                    jsonfile.writeFileSync(target_file, result_config_obj);
                } else { return console.error(err); }
            });
        }

        function _get_config_file_array() {
            console.log(_config_obj.template_config_path);
            const src_path = [_config_obj.template_config_path, 'config_file_dir', '**/*.json'].join('/');
            const file_array = dir_glob.sync(src_path);

            return file_array;
        }
    }
}
