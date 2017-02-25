const gulp = require('gulp');
const gulp_sequence = require('gulp-sequence');
const dir_glob = require('glob')
const jsonfile = require('jsonfile');

const _config_obj = {
    "template_config_path": [__dirname, 'webapp-template', 'template_config'].join('/')
}

gulp.task('template_config', () => {
    console.log(_config_obj.template_config_path);
    const src_path = [_config_obj.template_config_path, '**/*.json'].join('/');
    const target_file = [_config_obj.template_config_path, '_webapp_template_config.json'].join('/');
    const config_file_array = dir_glob.sync(src_path);

    let result_config_obj = {};
    config_file_array.forEach((config_file) => {
        const config_json = jsonfile.readFileSync(config_file);
        const name_key = config_json.name_key;
        console.log(name_key);
        result_config_obj[name_key] = config_json;
    });
    jsonfile.writeFileSync(target_file, result_config_obj);
});

gulp.task('default', gulp_sequence(['template_config']));
// gulp.task('default', gulp_sequence(['hi']));
