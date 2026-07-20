/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerToolboxs () {
    return `
<category name="%{BKY_ESPMPU6050_CATEGORY}" id="ESPMPU6050_CATEGORY" colour="#FF8C1A" secondaryColour="#DB6E00" iconURI="">
    <block type="espMpu6050_init" id="espMpu6050_init">
        <field name="SDA">21</field>
        <field name="SCL">22</field>
    </block>
    <block type="espMpu6050_accel" id="espMpu6050_accel">
        <field name="AXIS">0</field>
    </block>
    <block type="espMpu6050_gyro" id="espMpu6050_gyro">
        <field name="AXIS">0</field>
    </block>
    <block type="espMpu6050_temperature" id="espMpu6050_temperature"></block>
</category>    `;
}
exports = registerToolboxs;
