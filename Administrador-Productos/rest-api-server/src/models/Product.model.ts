import {Table, Model, Column, DataType, Default} from 'sequelize-typescript';

@Table({
    tableName: 'Producto'
})

class Producto extends Model {
    @Column({
        type: DataType.STRING(100)
    })
    nombre: string

    @Column({
        type: DataType.FLOAT(6, 2)
    })
    precio: number

    @Default(true)
    @Column({
        type: DataType.BOOLEAN
    })
    disponible: boolean
}

export default Producto