/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerToolboxs () {
    return `
<category name="%{BKY_ESPOLED_CATEGORY}" id="ESPOLED_CATEGORY" colour="#9966FF" secondaryColour="#774DCB" iconURI="">
    <block type="espOled_init" id="espOled_init">
        <field name="SDA">21</field>
        <field name="SCL">22</field>
        <field name="ADDR">auto</field>
    </block>
    <block type="espOled_clear" id="espOled_clear">
    </block>
    <block type="espOled_text" id="espOled_text">
        <value name="TEXT">
            <shadow type="text">
                <field name="TEXT">hello</field>
            </shadow>
        </value>
        <value name="X">
            <shadow type="math_number">
                <field name="NUM">0</field>
            </shadow>
        </value>
        <value name="Y">
            <shadow type="math_number">
                <field name="NUM">0</field>
            </shadow>
        </value>
    </block>
    <block type="espOled_pixel" id="espOled_pixel">
        <value name="X">
            <shadow type="math_number">
                <field name="NUM">64</field>
            </shadow>
        </value>
        <value name="Y">
            <shadow type="math_number">
                <field name="NUM">32</field>
            </shadow>
        </value>
    </block>
    <block type="espOled_line" id="espOled_line">
        <value name="X1">
            <shadow type="math_number">
                <field name="NUM">0</field>
            </shadow>
        </value>
        <value name="Y1">
            <shadow type="math_number">
                <field name="NUM">0</field>
            </shadow>
        </value>
        <value name="X2">
            <shadow type="math_number">
                <field name="NUM">127</field>
            </shadow>
        </value>
        <value name="Y2">
            <shadow type="math_number">
                <field name="NUM">63</field>
            </shadow>
        </value>
    </block>
    <block type="espOled_show" id="espOled_show">
    </block>
</category>    `;
}
exports = registerToolboxs;
