// TODO: Insert fields.
const javaFields = `
    private String field0;
    private String field1 = null;
    private int field2 = 0;
`;

// TODO: Insert class name.
const className = 'Example';




function parseFields(fields) {
    const res = [];
    fields.trim().split(';').map(field => field.split('=')[0].trim()).forEach(field => {
        let words = field.split(/\s/g);

        if (words && words.length > 1) {
            res.push({
                type: words[words.length - 2],
                name: words[words.length - 1]
            });
        }
    });

    return res;
}

function generate(className, fields, javaFields) {
    return `public class ${className} {
        ${javaFields}
    
    private ${className}(${className}Builder builder) {
${fields.reduce((res, field) => res + `        ${field.name} = builder.${field.name};\n`, '')}    }
   
    public static class ${className}Builder {
            ${javaFields}
    
${fields.reduce((res, field) => res + `        public ${className}Builder ${field.name}(${field.type} ${field.name}) {
            this.${field.name} = ${field.name};
                return this;
        }\n\n`, '')}
    
        public ${className} build() {
            return new ${className}(this);
        }
    }
}`;
}

const fields = parseFields(javaFields);
console.log(fields);
console.log(generate(className, fields, javaFields));
