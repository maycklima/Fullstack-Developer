package ecomercebackend.repository;

import ecomercebackend.models.entity.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepositoty extends JpaRepository <Produto, Integer>{
}
