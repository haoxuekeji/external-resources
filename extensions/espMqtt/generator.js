/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerGenerators (Blockly) {

    const ensureClient = () => {
        Blockly.Python.imports_.espMqtt = 'from umqtt_simple import MQTTClient';
        Blockly.Python.imports_.espMqtt_machine = 'import machine';
        Blockly.Python.imports_.espMqtt_ubinascii = 'import ubinascii';

        Blockly.Python.variables_._mqtt_topic = `_mqtt_topic = ''`;
        Blockly.Python.variables_._mqtt_msg = `_mqtt_msg = ''`;

        Blockly.Python.libraries_.espMqtt_cb =
            `def _ob_mqtt_cb(_t, _m):\n` +
            `    global _mqtt_topic, _mqtt_msg\n` +
            `    _mqtt_topic = _t.decode()\n` +
            `    _mqtt_msg = _m.decode()\n` +
            `    if 'on_mqtt_message' in globals():\n` +
            `        on_mqtt_message()\n`;
    };

    Blockly.Python.espMqtt_connect = function (block) {
        ensureClient();

        const host = Blockly.Python.valueToCode(block, 'HOST', Blockly.Python.ORDER_ATOMIC) || `'broker.emqx.io'`;
        const port = Blockly.Python.valueToCode(block, 'PORT', Blockly.Python.ORDER_ATOMIC) || '1883';

        let code = `_mqtt = MQTTClient('ob_' + ubinascii.hexlify(machine.unique_id()).decode(), str(${host}), int(${port}))\n`;
        code += `_mqtt.set_callback(_ob_mqtt_cb)\n`;
        code += `_mqtt.connect()\n`;
        return code;
    };

    Blockly.Python.espMqtt_disconnect = function () {
        return `_mqtt.disconnect()\n`;
    };

    Blockly.Python.espMqtt_subscribe = function (block) {
        const topic = Blockly.Python.valueToCode(block, 'TOPIC', Blockly.Python.ORDER_ATOMIC) || `''`;
        return `_mqtt.subscribe(str(${topic}).encode())\n`;
    };

    Blockly.Python.espMqtt_publish = function (block) {
        const topic = Blockly.Python.valueToCode(block, 'TOPIC', Blockly.Python.ORDER_ATOMIC) || `''`;
        const msg = Blockly.Python.valueToCode(block, 'MSG', Blockly.Python.ORDER_ATOMIC) || `''`;
        return `_mqtt.publish(str(${topic}).encode(), str(${msg}).encode())\n`;
    };

    Blockly.Python.espMqtt_checkMsg = function () {
        return `_mqtt.check_msg()\n`;
    };

    Blockly.Python.espMqtt_whenMessage = function (block) {
        ensureClient();

        // Poll for incoming messages in the generated repeat() loop, so the
        // hat also works in programs that have no forever loop of their own.
        Blockly.Python.loops_.espMqtt_checkMsg = `_mqtt.check_msg()`;

        let code = `def on_mqtt_message():\n`;

        const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
        if (nextBlock) {
            const variablesName = [];
            for (const x in Blockly.Python.variables_) {
                variablesName.push(Blockly.Python.variables_[x].slice(0, Blockly.Python.variables_[x].indexOf('=') - 1));
            }
            if (variablesName.length !== 0) {
                code += `${Blockly.Python.INDENT}global ${variablesName.join(', ')}\n`;
            }
            code = Blockly.Python.scrub_(block, code);
        } else {
            code += `${Blockly.Python.INDENT}pass\n`;
        }

        Blockly.Python.libraries_['def on_mqtt_message'] = code;
        return null;
    };

    Blockly.Python.espMqtt_topic = function () {
        return ['_mqtt_topic', Blockly.Python.ORDER_ATOMIC];
    };

    Blockly.Python.espMqtt_message = function () {
        return ['_mqtt_msg', Blockly.Python.ORDER_ATOMIC];
    };

    return Blockly;
}

exports = registerGenerators;
